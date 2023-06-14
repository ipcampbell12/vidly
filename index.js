
const Joi = require('joi');
const express = require('express');
const genres = require('./routes/genres')


const app = express()
app.use(express.json());
app.use('/api/genres', genres)





//in terminal: export PORT=5001
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});