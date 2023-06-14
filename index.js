
const Joi = require('joi');
const express = require('express');


const app = express()
app.use(express.json());


const genres = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Science Fiction' },
    { id: 3, name: 'Action' },
    { id: 4, name: 'Comedy' }
];


//in terminal: export PORT=5001
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});