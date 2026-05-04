const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch((err) => console.log('Error:', err));

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,9}$/, 'Invalid phone format'],
    sparse: true
  },
  website: String,
  city: String,
  age: {
    type: Number,
    min: [1, 'Age must be at least 1'],
    max: [120, 'Age cannot exceed 120']
  },
  country: String,
  gender: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// ─── ROUTES ───────────────────────────────

// GET — সব user দেখা
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// POST — নতুন user তৈরি
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// PUT — user আপডেট
app.put('/users/:id', async (req, res) => {
  try {
    const { email } = req.body;

    // ইমেইল আপডেট করতে চাইলে চেক করা যে ওই ইমেইল অন্য কেউ ব্যবহার করছে কি না
    if (email) {
      const existingUser = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already taken by another user" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Validation চালু রাখা হয়েছে
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// DELETE — user মোছা
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: 'User deleted!' });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000 🚀');
});