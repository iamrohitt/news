const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // Choose an appropriate port number

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mario:Fr33t3st@mern.uocqkrr.mongodb.net/disaster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });

const relatedSchema = new mongoose.Schema({
    title: String,
    timestamp: Date,
    twitterUrl: String,
});

const Related = mongoose.model('related', relatedSchema);

app.get('/api/related', (req, res) => {
    Related.find({})
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching data from MongoDB:', error);
            res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
        });
});