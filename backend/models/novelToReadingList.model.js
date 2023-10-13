const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const novelToReadingListSchema = new Schema({
    reading_list_id: {type:String, required: true},
    novel_id: {type:String, required: true},
    progress: {type:String, required: true},
}, {
    timestamps: true
});

const NovelToReadingList = mongoose.model('NovelToReadingList', novelToReadingListSchema);
module.exports = NovelToReadingList;