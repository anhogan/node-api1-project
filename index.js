const express = require('express');

const server = express();

server.post('/api/users', (req, res) => {
  res.status(400).json({ errorMessage: "Please provide name and bio for the user." }); // If name or bio missing from req body
  res.status(201); // Send back created user
  res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
});

server.get('/api/users', (req, res) => {
  res.status(500).json({ errorMessage: "The users information could not be retrieved." });
});

server.get('/api/users/:id', (req, res) => {
  res.status(404).json({ message: "The user with the specified ID does not exist." }); // If id in req body not found
  res.status(500).json({ errorMessage: "The user information could not be retrieved." });
});

server.delete('/api/users/:id', (req, res) => {
  res.status(404).json({ message: "The user with the specified ID does not exist." }); // If id in req body not found
  res.status(500).json({ errorMessage: "The user could not be removed" });
});

server.patch('/api/users/:id', (req, res) => {
  res.status(404).json({ message: "The user with the specified ID does not exist." }); // If id in req body not found
  res.status(400).json({ errorMessage: "Please provide name and bio for the user." }); // If name or bio missing from req body
  res.status(500).json({ errorMessage: "The user information could not be modified." });
  res.status(200).json(); // Send back updated user
});

const PORT = 5000;

server.listen(PORT, () => console.log(`\n ** API listening on http://localhost:${PORT} **\n`));