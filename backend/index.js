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
  name: String,
  email: String,
  phone: String,
  website: String,
  city: String,
  age: Number,
  country: String,
  gender: String
});

const User = mongoose.model('User', userSchema);

// ─── ROUTES ───────────────────────────────

// GET — সব user
app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// POST — নতুন user
app.post('/users', async (req, res) => {
  try{
    const {name, email, phone, website, city, age, country, gender} = req.body
    const user = new User({name, email, phone, website, city, age, country, gender})
    await user.save()
    res.json({message: 'User created', user})
  } catch (err) {
    res.status(500).json({message: "Error creating user", error:err})
  }
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
