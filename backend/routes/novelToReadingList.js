const router = require('express').Router();
const { useState } = require('react');
let NovelToReadingList = require('../models/novelToReadingList.model');

router.route('/').get((req, res) => {
    NovelToReadingList.find()
        .then(novelToRList => res.json(novelToRList))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const reading_list_id = req.body.reading_list_id;
    const novel_id = req.body.novel_id;
    const progress = req.body.progress;

    const newConnection = new NovelToReadingList({reading_list_id, novel_id, progress});

    newConnection.save()
        .then(() => res.json('Novel Added to Reading List'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:reading_list_id').get((req, res) => {
    NovelToReadingList.find({reading_list_id: req.params.reading_list_id})
        .then(novelToRList => res.json(novelToRList))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findOne/:reading_list_id/:novel_id').get((req, res) => {
    NovelToReadingList.findOne({reading_list_id: req.params.reading_list_id, novel_id: req.params.novel_id})
        .then(novelToRList => res.json(novelToRList))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/novelStatus/:user_id/:novel_id').get((req, res) => {
    const user_id = req.params.user_id;
    const novel_id = req.params.novel_id;
    
    fetch('http://localhost:5000/readingList/find/' + user_id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: ' + response.statusText);
            }
            return response.json();
        })
        .then(readingListData => {
            if (Array.isArray(readingListData) && readingListData.length > 0) {
                const promises = readingListData.map(item => {
                    return fetch('http://localhost:5000/novelToList/findOne/' + item._id + '/' + novel_id)
                        .then(response => {
                            if (!response.ok) {
                                // throw new Error('Error: ' + response.statusText);
                            }
                            if(response != null){
                                return response.json();
                            }
                        });
                });

                return Promise.all(promises);
                // return readingListData;
            } 
            // else {
            //     throw new Error('Reading list data not found');
            // }
        })
        .then(result => {
            const nonNullResult = result.find(item => item !== null);
            if (nonNullResult !== undefined) {
                res.json(nonNullResult);
            } else {
                res.json(null);
            }
            
        })
        .catch(error => {
            console.error('Error', error);
            res.status(500).json({ error: error.message });
        });
});

router.route('/moveNovel/:id').put((req, res) => {
    NovelToReadingList.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Novel to RList Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findAndDelete/:id').delete((req, res) => {
    const novelToReadingListId = req.params.id;

    NovelToReadingList.findOneAndDelete({ _id: novelToReadingListId })
    .then(deletedNovel => {
        if (deletedNovel) {
            res.json(deletedNovel);
        } else {
            res.status(404).json('NovelToReadingList not found');
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;