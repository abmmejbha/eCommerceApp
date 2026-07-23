import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  
  console.log("Frontend response received:", req.body); // Log the request body to see what is being sent

  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.log("Error saving user:", error); // Log the error to see what went wrong
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (isPasswordValid) {
      generateToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
  res.status(401);
  throw new Error("Invalid email or password");
});

// LOGOUT USER
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
};

// GET ALL USERS
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
})

// CREATE USER
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin: isAdmin || false,
  });

  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// UPDATE USER
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

  try {
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// DELETE USER
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  try {
    await user.remove();
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(400);
    throw new Error("Error removing user");
  }
});

export { registerUser, loginUser, logoutUser, getUsers, createUser, updateUser, deleteUser };
