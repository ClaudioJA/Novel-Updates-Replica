const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    const newUser = new User({username, password, role});

    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('User Updated'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/delete/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json('User not found');
        }
  
        user.username = req.body.username;
        user.password = req.body.password;
        user.updatedAt = req.body.updatedAt;
  
        user.deleteOne()
          .then(() => res.json('User Deleted'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});
  

router.route('/find/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/username/:username').get((req, res) => {
  User.findOne({ username: req.params.username })
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login/:username/:password').get((req, res) => {
  User.findOne({ username: req.params.username, password: req.params.password })
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = "User";

  const newUser = new User({username, password, role});

  newUser.save()
      .then(() => res.json('User Added'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;