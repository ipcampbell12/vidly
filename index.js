
import express from "express";

const app = express();
const Joi = require('joi');

app.use(express.json());


const genres = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Science Fiction' },
    { id: 3, name: 'Action' },
    { id: 4, name: 'Comedy' },
];

const findGenre = (id) => genres.find(genre => genre.id === parseInt(id))


app.get('/api/genres', (req, res) => {
    res.send(genres)
})


app.get('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`There is no genre with ID ${req.params.id}`)

    res.send(genre)
})