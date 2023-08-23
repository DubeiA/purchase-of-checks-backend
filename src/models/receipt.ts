"use strict";
import { Model, Optional } from "sequelize";
import { IReceipt } from "../types/IReceipt";

type IReceiptAttributes = Optional<IReceipt, "id">;

module.exports = (sequelize: any, DataTypes: any) => {
  class Receipt extends Model<IReceipt, IReceiptAttributes> {
    static associate(models: any) {
      Receipt.belongsToMany(models.Products, {
        through: "ProductsInReceipt",
      });
    }
  }
  Receipt.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      number: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Receipt",
    }
  );
  return Receipt;
};
