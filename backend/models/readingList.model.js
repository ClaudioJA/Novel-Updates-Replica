const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readingListSchema = new Schema({
    reading_list_name: {type:String, required: true},
    user_id: {type:String, required: true},
}, {
    timestamps: true
});

const ReadingList = mongoose.model('ReadingList', readingListSchema);
module.exports = ReadingList;