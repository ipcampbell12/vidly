
const express = require('express');
const Joi = require('joi');

const app = express()
app.use(express.json());


const genres = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Science Fiction' },
    { id: 3, name: 'Action' },
    { id: 4, name: 'Comedy' },
];

//helper functions
const findGenre = (id) => genres.find(genre => genre.id === parseInt(id))

const validateGenre = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required()
    })

    return schema
}


app.get('/api/genres', (req, res) => {
    res.send(genres)
});


app.get('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`There is no genre with ID ${req.params.id}`)

    res.send(genre)
});


app.post('/api/genres', (req, res) => {

    const { error } = validateGenre(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre)
    res.send(genre)
})

app.put()

app.delete()

//in terminal: export PORT=5001
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})