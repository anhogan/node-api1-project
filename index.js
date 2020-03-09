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

function invalidID(req, res, next) {
  console.log('Finding user by ID...');
  if(req.body.id) {
    users.findById(req.body.id, function(user) {
      if(user) {
        req.currentUser = user;
        res.status(200).json(user);
        return next();
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    })
  }
};



server.post('/api/users', reqParams, (req, res) => {
  const userInfo = req.body;
  userInfo.id = shortid.generate();
  users.push(userInfo);

  res.status(201).json(users);
  res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
});

server.get('/api/users', (req, res) => {
  res.status(200).json(users);
  res.status(500).json({ errorMessage: "The users information could not be retrieved." });
});

server.get('/api/users/:id', invalidID, (req, res) => {
  res.status(500).json({ errorMessage: "The user information could not be retrieved." });
});

server.delete('/api/users/:id', (req, res) => {
  res.status(200).json() // Successfully deleted user by id
  res.status(404).json({ message: "The user with the specified ID does not exist." }); // If id in req body not found
  res.status(500).json({ errorMessage: "The user could not be removed" });
});

server.patch('/api/users/:id', reqParams, (req, res) => {
  res.status(404).json({ message: "The user with the specified ID does not exist." }); // If id in req body not found
  res.status(500).json({ errorMessage: "The user information could not be modified." });
  res.status(200).json(); // Send back updated user
});

const PORT = 5000;

server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT} **\n`));