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
  const user = new User(req.body);
  await user.save();
  res.json({ message: 'User created!', user });
});

// DELETE — user মুছো
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted!' });
});

// ──────────────────────────────────────────

app.listen(3000, () => {
  console.log('Server running on port 3000 🚀');
});
