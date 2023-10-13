const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users')
const novelsRouter = require('./routes/novels')
const chaptersRouter = require('./routes/chapters')
const readingListRouter = require('./routes/readingList')
const novelToReadingListRouter = require('./routes/novelToReadingList')

app.use('/users', usersRouter);
app.use('/novels', novelsRouter);
app.use('/chapters', chaptersRouter);
app.use('/readingList', readingListRouter);
app.use('/novelToList', novelToReadingListRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});