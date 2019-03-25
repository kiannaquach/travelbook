const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const app = express();

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB succesfully connected!'))
    .catch(err => console.log('err'));
    
app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));