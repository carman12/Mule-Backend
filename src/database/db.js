import { Sequelize } from "sequelize";

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_NAME } = process.env;

import UserModel from "../models/User.js";
import AdminModel from "../models/Admin.js";
import DriverModel from "../models/Driver.js";
import VehicleModel from "../models/Vehicle.js";
import EnlistmentModel from "../models/Enlistment.js";
import OrderShipmentModel from "../models/OrderShipment.js";
import TypeShipmentModel from "../models/TypeShipment.js";

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE_NAME}`,
  { logging: false }
);

UserModel(sequelize);
AdminModel(sequelize);
DriverModel(sequelize);
VehicleModel(sequelize);
EnlistmentModel(sequelize);
OrderShipmentModel(sequelize);
TypeShipmentModel(sequelize);

const {
  User,
  Admin,
  Client,
  Driver,
  Vehicle,
  Enlistment,
  OrderShipment,
  TypeShipment,
} = sequelize.models;

Vehicle.hasOne(Driver, { foreignKey: "vehicle_id" });
Driver.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

Driver.belongsToMany(Enlistment, { through: "enlistment_driver" });
Enlistment.belongsToMany(Driver, { through: "enlistment_driver" });

TypeShipment.hasMany(OrderShipment, {
  as: "typeShipment",
  foreignKey: "typeShipmentId",
});
OrderShipment.belongsTo(TypeShipment, { foreignKey: "typeShipmentId" });

OrderShipment.hasOne(Enlistment, { foreignKey: "ordershipment_id" });
Enlistment.belongsTo(OrderShipment, { foreignKey: "ordershipment_id" });

export {
  User,
  Admin,
  Client,
  Driver,
  Vehicle,
  Enlistment,
  OrderShipment,
  TypeShipment,
};

export default sequelize;
