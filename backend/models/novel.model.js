const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const novelSchema = new Schema({
    title: {type:String, required: true},
    author: {type:String, required: true},
    desc: {type:String},
    alternative_title: {type:String},
    rating: {type:Number},
    genre: {type: [String], required: true,},
    picture_link: {type: [String], required: true,},

}, {
    timestamps: true
});

const Novel = mongoose.model('Novel', novelSchema);
module.exports = Novel;