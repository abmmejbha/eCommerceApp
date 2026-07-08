import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(404).json({ error: "User পাওয়া যায়নি" });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ error: "User পাওয়া যায়নি" });

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
  });
});

export { getUserProfile, updateUserProfile };
