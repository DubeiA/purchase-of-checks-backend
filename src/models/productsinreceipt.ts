"use strict";
import { Model, Optional } from "sequelize";
import { IProductsInReceipt } from "../types/IProductsInReceipt";

type IProductsInReceiptAttributes = Optional<IProductsInReceipt, "ProductId">;

module.exports = (sequelize: any, DataTypes: any) => {
  class ProductsInReceipt extends Model<
    IProductsInReceipt,
    IProductsInReceiptAttributes
  > {}
  ProductsInReceipt.init(
    {
      ProductId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Products",
          key: "id",
        },
      },
      ReceiptId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Receipt",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductsInReceipt",
    }
  );
  return ProductsInReceipt;
};
