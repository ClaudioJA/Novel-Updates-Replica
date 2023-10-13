const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    novel_id: {type:String, required: true},
    number: {type:Number, required: true},
    title: {type:String, required: true},
    link: {type:String, required: true},
    group_name: {type:String, required: true},

}, {
    timestamps: true
});

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;