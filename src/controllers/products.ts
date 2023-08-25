import { Request, Response, RequestHandler } from "express";
import { ctrlWrapper } from "../helpers/ctrlWrapper";
import { HttpError } from "../helpers/HttpError";
import { IProducts } from "../types/IGoods";
import { v4 as uuidv4 } from "uuid";
import { IProductsInReceipt } from "../types/IProductsInReceipt";
import { IReceipt } from "../types/IReceipt";
import db from "../models";

const currentDateTime = new Date();
const year = currentDateTime.getFullYear();
const month = currentDateTime.getMonth();
const day = currentDateTime.getDate();
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const seconds = currentDateTime.getSeconds();

const getAll: RequestHandler = async (req: Request, res: Response) => {
  const result: IProducts = await db.Products.findAll();
  if (!result) {
    throw HttpError(404);
  }

  return res.status(200).json(result);
};

const createReceipt = async (req: Request, res: Response) => {
  const { total }: { total: number } = req.body;

  const newReceipt: IReceipt = await db.Receipt.create({
    id: uuidv4(),
    date: null,
    total,
  });

  if (!newReceipt) {
    throw HttpError(404);
  }

  return res.status(201).json(newReceipt);
};

const modifyProductInReceipt = async (req: Request, res: Response) => {
  const {
    ReceiptId,
    products,
  }: { ReceiptId: string; products: [IProductsInReceipt] } = req.body;

  const receipt = await db.Receipt.findByPk(ReceiptId);

  if (!receipt) {
    return res.status(404).json({ message: "Receipt not found" });
  }

  const updatedProducts = await Promise.all(
    products.map(async (product: IProductsInReceipt) => {
      const { ProductId, quantity, price } = product;
      const existingProduct = await db.Products.findByPk(ProductId);

      if (!existingProduct) {
        return null;
      }

      return db.ProductsInReceipt.upsert({
        ProductId: ProductId,
        ReceiptId: ReceiptId,
        quantity,
        price,
      });
    })
  );

  const filteredProducts = updatedProducts
    .flat()
    .filter((product) => product !== null);

  return res.status(200).json(filteredProducts);
};

const removeProductFromReceipt = async (req: Request, res: Response) => {
  const { ReceiptId, ProductId }: { ReceiptId: string; ProductId: string } =
    req.body;

  const productInReceipt = await db.ProductsInReceipt.findOne({
    where: {
      ReceiptId: ReceiptId,
      ProductId: ProductId,
    },
  });

  if (!productInReceipt) {
    return res.status(404).json({ message: "Product not found in receipt" });
  }

  await productInReceipt.destroy();

  return res.status(204).send();
};

const close = async (req: Request, res: Response) => {
  const { ReceiptId } = req.params;
  const { total }: { total: number } = req.body;

  const receipt = await db.Receipt.findByPk(ReceiptId);

  if (!receipt) {
    return res.status(404).json({ message: "Receipt not found" });
  }

  const close: IReceipt = await receipt.update({
    date: new Date(year, month, day, hours, minutes, seconds),
    total,
  });

  return res.status(200).json(close);
};

const closeReceipt = ctrlWrapper(close);
const getAllProducts = ctrlWrapper(getAll);
const addReceipt = ctrlWrapper(createReceipt);
const correctReceipt = ctrlWrapper(modifyProductInReceipt);
const deleteProduct = ctrlWrapper(removeProductFromReceipt);

export {
  getAllProducts,
  addReceipt,
  correctReceipt,
  closeReceipt,
  deleteProduct,
};
