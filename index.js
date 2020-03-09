const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];

server.use(express.json());

function reqParams(req, res, next) {
  console.log('Validating user...');
  if(!req.body.name || !req.body.bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  };

  next();
};

server.post('/api/users', reqParams, (req, res) => {
  const userInfo = req.body;
  userInfo.id = shortid.generate();
  users.push(userInfo);

  if (userInfo) {
    res.status(201).json(users);
  } else {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
  };
});

server.get('/api/users', (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." });
  };
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === String(id));

  if (!user) {
    res.status(404).json({ message: "The user with the specified ID does not exist." });
  } else if (!id) {
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  } else {
    res.status(200).render(user);
  };
});

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  const user = users.find(user => user.id === String(id));

  if (!user) {
    res.status(404).json({ message: "The user with the specified ID does not exist." });
  } else if (!id) {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  } else {
    delete user;
    res.status(200).json(users);
  };
});

server.patch('/api/users/:id', reqParams, (req, res) => {
  const id = req.params.id
  const user = users.find(user => user.id === String(id));

  if (!user) {
    res.status(404).json({ message: "The user with the specified ID does not exist." });
  } else if (!id) {
    res.status(500).json({ errorMessage: "The user information could not be modified." });
  } else {
    Object.assign(user, req.body);
    res.status(200).json(user);
  };
});

const PORT = 5000;

server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT} **\n`));