const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true, useUnifiedTopology: true });

const TodoSchema = new mongoose.Schema({
  text: String,
  date: Date,
  color: String
});

const Todo = mongoose.model('Todo', TodoSchema);

app.get('/api/todos', async (req, res) => {
  const { start, end } = req.query;
  const todos = await Todo.find({ date: { $gte: new Date(start), $lte: new Date(end) } });
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});

app.put('/api/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
