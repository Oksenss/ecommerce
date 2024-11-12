import mongoose from "mongoose";
import dotenv from "dotenv";

import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

// env variables
dotenv.config();

// connect to db
connectDB();

// add dummy data to db
const importData = async () => {
  try {
    // remove all data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // add users
    const createdUsers = await User.insertMany(users);
    // make admin user
    const adminUser = createdUsers[0]._id;
    // get all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // add products to db
    await Product.insertMany(sampleProducts);
    // if successful console log and exit
    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // remove all data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // if successful console log and exit
    console.log("Data destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// command to run in terminal to either import or destroy data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
