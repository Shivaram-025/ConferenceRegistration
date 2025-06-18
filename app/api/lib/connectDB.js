// import mongoose from "mongoose";

// let isConnected = false;  

// const DB = process.env.DATABASE_URL;

// async function connectDB() {
//   if (isConnected) {
//     console.log("Already connected to Database...");
//     return;
//   }
  
//   try {
//     await mongoose.connect(DB);
//     isConnected = true;
//     console.log("Connected to Database successfully...");
//   } catch (error) {
//     console.error("Database connection error:", error);
//   }
// }

// export default connectDB;

import mongoose from "mongoose";

let isConnected = false;  

const DB = process.env.DATABASE_URL;

async function connectDB() {
  if (isConnected) {
    console.log("Already connected to Database...");
    return;
  }
  
  try {
    await mongoose.connect(DB);
    isConnected = true;
    console.log("Connected to Database successfully...");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

export default connectDB;