const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

// Your routes here...

// Sample in-memory data
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

app.get('/', (req, res) => {
  res.send('Welcome to the User API');
});

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a single user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  user ? res.json(user) : res.status(404).send('User not found');
});

// POST (add) a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update) a user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.status(204).send(); // No content
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
