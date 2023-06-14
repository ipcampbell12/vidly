const express = require('express');
const router = express.Router();
const appDebugger = require('debug')('app:startup')
const Joi = require('joi');



//data
const genres = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Science Fiction' },
    { id: 3, name: 'Action' },
    { id: 4, name: 'Comedy' }
];



//helper functions
const findGenre = (id) => genres.find(genre => genre.id === parseInt(id))

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required()
    })

    return schema.validate(genre)
}

//endpoints
router.get('/', (req, res) => {
    res.send(genres)
    appDebugger('Retrieved all genres')
});


router.get('/:id', (req, res) => {
    const genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`There is no genre with ID ${req.params.id}`)

    res.send(genre)

    appDebugger(`Retrieved the genre: ${genre.name}`)
});


router.post('/', (req, res) => {

    const { error } = validateGenre(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre)
    res.send(genre)

    appDebugger(`Created the genre: ${genre.name}`)
});

router.put('/:id', (req, res) => {

    const genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`There is no genre with ID ${req.params.id}`)

    const { error } = validateGenre(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name;

    res.send(genre)

    appDebugger(`Updated the genre: ${genre.name}`)
});

router.delete('/:id', (req, res) => {
    const genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`There is no genre with ID ${req.params.id}`)

    const genreIndex = genres.indexOf(genre)
    genres.splice(genreIndex, 1)

    appDebugger(`Deleting the genre: ${genre.name}`)

    res.send(genre)


})


module.exports = router;