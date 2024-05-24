import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Measure",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      value: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      measures: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
