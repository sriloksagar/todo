const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: './mongo_db.env' });

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Todo model
const TodoSchema = new mongoose.Schema({
  text: String,
  date: Date,
  color: String
});

const Todo = mongoose.model('Todo', TodoSchema);

// Routes
app.get('/api/todos', async (req, res) => {
  try {
    const { start, end } = req.query;
    const todos = await Todo.find({ date: { $gte: new Date(start), $lte: new Date(end) } });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo', error: error.message });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo', error: error.message });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
