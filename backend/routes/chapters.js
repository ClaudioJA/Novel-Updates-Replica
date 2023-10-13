const router = require('express').Router();
let Chapter = require('../models/chapter.model');

router.route('/').get((req, res) => {
    Chapter.find()
        .then(chapters => res.json(chapters))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const number = req.body.number;
    const title = req.body.title;
    const link = req.body.link;
    const novel_id = req.body.novel_id;
    const group_name = req.body.group_name;

    const newChapter = new Chapter({number, title, link, novel_id, group_name});

    newChapter.save()
        .then(() => res.json('Chapter Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Chapter.findById(req.params.id)
      .then(chapters => {
        if (!chapters) {
          return res.status(404).json('User not found');
        }
  
        chapters.username = req.body.username;
        chapters.password = req.body.password;
        chapters.updatedAt = req.body.updatedAt;
  
        chapters.save()
          .then(() => res.json('User Updated'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/delete/:id').post((req, res) => {
    Chapter.findById(req.params.id)
      .then(chapters => {
        if (!chapters) {
          return res.status(404).json('User not found');
        }
  
        chapters.username = req.body.username;
        chapters.password = req.body.password;
        chapters.updatedAt = req.body.updatedAt;
  
        chapters.deleteOne()
          .then(() => res.json('User Deleted'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/findChapter/:_id').get((req, res) => {
  Chapter.findOne({ _id: req.params._id })
      .then(chapters => res.json(chapters))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:novel_id').get((req, res) => {
  Chapter.find({ novel_id: req.params.novel_id })
      .then(chapters => res.json(chapters))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/latest/:novel_id').get((req, res) => {
  Chapter.findOne({ novel_id: req.params.novel_id })
      .sort({ number: -1 })
      .then(chapters => res.json(chapters))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/first/:novel_id').get((req, res) => {
  Chapter.findOne({ novel_id: req.params.novel_id })
      .sort({ number: 1 })
      .then(chapters => res.json(chapters))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;