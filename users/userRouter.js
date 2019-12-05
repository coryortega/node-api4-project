const express = require('express');

const router = express.Router();

const Users = require('./userDb.js');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  const newPost = req.body
  Users.insert(newPost)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The user has been deleted' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  });
});

router.put('/:id', (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = user
    } else {
      res.status(400).json({ errorMessage: 'invalid post ID' })
    }
  })
 next();
}

function validateUser(req, res, next) {
  // do your magic!
  const userData = req.body;
  if(!userData.name){
    res.status(400).json({ errorMessage: "you need a name" })
  }
 next();
}

function validatePost(req, res, next) {
  // do your magic!

}

module.exports = router;
