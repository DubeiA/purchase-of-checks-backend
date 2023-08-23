"use strict";
import { Model, Optional } from "sequelize";
import { IProducts } from "../types/IGoods";

type IProductsAttributes = Optional<IProducts, "id">;

module.exports = (sequelize: any, DataTypes: any) => {
  class Products extends Model<IProducts, IProductsAttributes> {
    static associate(models: any) {
      Products.belongsToMany(models.Receipt, {
        through: "ProductsInReceipt",
      });
    }
  }
  Products.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
