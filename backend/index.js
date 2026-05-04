const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connect
// mongoose.connect('mongodb://localhost:27017/userdb')
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

// GET — সব user
app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// POST — নতুน user
app.post('/users', async (req, res) => {
  try{
    const {name, email, phone, website, city, age, country, gender} = req.body
    
    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({message: "Email already exists", error: "DUPLICATE_EMAIL"})
    }
    
    const user = new User({name, email, phone, website, city, age, country, gender})
    await user.save()
    res.status(201).json({message: 'User created successfully', user})
  } catch (err) {
    const {email} = req.body
    
    // Check if new email already exists (and it's different from current)
    if (email) {
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: req.params.id }
      })
      if (existingUser) {
        return res.status(400).json({message: "Email already exists", error: "DUPLICATE_EMAIL"})
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.json({message: "User updated successfully", user: updatedUser})
  }
  catch(err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({message: "Validation failed", errors: messages})
    }
    res.status(500).json({message: "Error updating user", error: err.message})
});


app.put('/users/:id', async (req, res) => {
  try {
    // ১. id এবং ২. নতুন ডেটা (req.body) পাঠাতে হবে
    // { new: true } দিলে আপডেট হওয়ার পর নতুন ডেটাটি রিটার্ন করে
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json({message: "User Updated! ", user: updatedUser})
  }
  catch(err) {
    res.status(500).json({message: "Error Updating user", error: err})
  }
})

// DELETE — user মুছো
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted!' });
});


// ──────────────────────────────────────────

app.listen(3000, () => {
  console.log('Server running on port 3000 🚀');
});
