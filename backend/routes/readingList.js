const router = require('express').Router();
let ReadingList = require('../models/readingList.model');

router.route('/').get((req, res) => {
    ReadingList.find()
        .then(rList => res.json(rList))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const reading_list_name = req.body.reading_list_name;
    const user_id = req.body.user_id;

    const newRList = new ReadingList({reading_list_name, user_id});

    newRList.save()
        .then(() => res.json('Reading List Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:user_id').get((req, res) => {
    ReadingList.find({ user_id: req.params.user_id })
        .then(rList => res.json(rList))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findByID/:id').get((req, res) => {
    ReadingList.findById(req.params.id)
        .then(rList => res.json(rList))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;