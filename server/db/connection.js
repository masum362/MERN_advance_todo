import mongoose from "mongoose";

const connection = async ( pass) => {
  try {
    await mongoose.connect(`mongodb+srv://masumahmed:${pass}@cluster0.w8vybgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

    return console.log("Database connection established");
  } catch (error) {
    return console.log(`Database connection error: ${error.message}`);
  }
};


export default connection;