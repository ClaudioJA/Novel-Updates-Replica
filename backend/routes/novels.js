const router = require('express').Router();
let Novel = require('../models/novel.model');

router.route('/').get((req, res) => {
    Novel.find()
        .then(novels => res.json(novels))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/order/latest').get((req, res) => {
  Novel.find()
      .sort({createdAt: -1})
      .then(novels => res.json(novels))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const desc = req.body.desc;
    const alternative_title = req.body.alternative_title;
    let genre = req.body.genre;
    const picture_link = req.body.picture_link;

    const newNovel = new Novel({title, author, desc, alternative_title, genre, picture_link});

    newNovel.save()
        .then(() => res.json('Novel Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Novel.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json('User not found');
        }
  
        user.username = req.body.username;
        user.password = req.body.password;
        user.updatedAt = req.body.updatedAt;
  
        user.save()
          .then(() => res.json('User Updated'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/delete/:id').post((req, res) => {
    Novel.findById(req.params.id)
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
    Novel.findById(req.params.id)
        .then(novels => res.json(novels))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;