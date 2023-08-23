import express from "express";
import db from "./src/models";

import { CustomError } from "./src/types/ICustomError";
const productRouter = require("./src/routes/products");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/", productRouter);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Not found" });
});

// const createProducts = () => {
//   products.map((product) => {
//     db.Products.create(product);
//   });
// };

// createProducts();

app.use(
  (
    err: CustomError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  }
);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
