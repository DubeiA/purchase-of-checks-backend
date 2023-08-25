const express = require("express");
import {
  getAllProducts,
  addReceipt,
  correctReceipt,
  closeReceipt,
  deleteProduct,
} from "../controllers/products";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add", addReceipt);
router.put("/correct", correctReceipt);
router.post("/close/:ReceiptId", closeReceipt);
router.delete("/delete", deleteProduct);

module.exports = router;
