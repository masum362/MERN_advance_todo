import todoModel from "../model/todoSchema.js";
import userModel from "../model/userSchema.js";
import { compareStrings, createJwtToken, hashString } from "../utils/index.js";

const homePage = () => {
  console.log("home page called");
};

const register = async (req, res) => {
  console.log("calling");
  //  await userModel.deleteMany({});
  try {
    const { name, username, email, password, confirmPassword } = req.body;
    console.log({ name, username, email, password, confirmPassword });

    if (
      name === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      email === "" ||
      !name ||
      !username ||
      !password ||
      !email ||
      !confirmPassword
    ) {
      console.log("calling from invalid");
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const isAlreadyRegister = await userModel.findOne({ email });
    console.log({ isAlreadyRegister });
    if (isAlreadyRegister) {
      return res.status(404).json({ message: "Already registered user" });
    }
    const isUserNameRegistered = await userModel.findOne({ username });

    if (isUserNameRegistered) {
      return res
        .status(404)
        .json({ message: "Please provide unique username" });
    } else {
      console.log({ password, confirmPassword });
      if (password !== confirmPassword) {
        return res
          .status(404)
          .json({ message: "Invalid username or password" });
      }

      const hashedPassword = await hashString(password);

      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        username,
      });

      await newUser.save();
      return res
        .status(201)
        .json({ message: "user registration successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({ message: "Something went wrong!" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === "" || password === "") {
      return res.status(404).json({ message: "Invalid User" });
    }

    const isUser = await userModel.findOne({ username });

    if (!isUser) {
      return res.status(404).json({ message: "Invalid User" });
    }

    const isMatch = await compareStrings(password, isUser.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid User" });
    }

    isUser.password = undefined;
    const token = createJwtToken(isUser?._id);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: false,
    });

    res.status(201).json({
      success: true,
      message: "Login successfully",
      isUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({ message: "Something went wrong!" });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (
      title === "" ||
      description == "" ||
      dueDate === "" ||
      priority === "" ||
      status === ""
    ) {
      return res.status(404).json({ message: "Invalid Todo" });
    }
    const newTodo = await new todoModel({
      title,
      description,
      priority,
      status,
      dueDate,
      userId: req.body.user.userId,
    });

    newTodo.save();

    return res.status(201).json({ newTodo });
  } catch (error) {
    return res.status(501).json({ message: "Something went wrong!" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({id})

    const { title, description, dueDate, priority, status } = req.body;

    const todo = await todoModel.findOneAndUpdate(
      { _id: id },
      { title, description, dueDate ,priority, status},
      { new: true }
    );

    return res.status(201).json({ todo, message: "Successfull updated todo" });
  } catch (error) {
    return res.status(501).json({ message: "Something went wrong!" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResult = await todoModel.findOneAndDelete({ _id: id });

    console.log({ deletedResult });

    return res.status(201).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Something went wrong!" });
  }
};

const getAllTodo = async (req, res) => {
  try {
    const todos = await todoModel.find({ userId: req.body.user.userId }).sort("-createdAt")
    return res.status(201).json({ todos });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Something went wrong!" });
  }

}
const getCompletedTodo = async (req, res) => {
  try {
    const todos = await todoModel.find({ userId: req.body.user.userId,status:"completed" }).sort("-createdAt")
    return res.status(201).json({ todos });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Something went wrong!" });
  }

}


const searchTodo = async (req, res) => {
  const {query} = req.query;
  const regexExpression = new RegExp(query, 'i');
  console.log({regexExpression})
  try {
    const todos = await todoModel.find({ userId: req.body.user.userId , description: { $regex: regexExpression }},).sort("-createdAt")
    return res.status(201).json({ todos });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Something went wrong!" });
  }
};
const filterWithPriority = async (req, res) => {
  const {priority} = req.query;
  console.log({priority})
  try {
    const todos = await todoModel.find({ userId: req.body.user.userId , priority}).sort("-createdAt")
    return res.status(201).json({ todos,message:`filtered with ${priority}` });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Something went wrong!" });
  }
};

export {
  homePage,
  login,
  register,
  addTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  searchTodo,
  getCompletedTodo,
  filterWithPriority
}
