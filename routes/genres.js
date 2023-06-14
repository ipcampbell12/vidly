const express = require('express');
const router = express.Router()

//helper functions
const findGenre = (id) => genres.find(genre => genre.id === parseInt(id))

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required()
    })

    return schema.validate(genre)
}


router.get('/api/genres', (req, res) => {
    res.send(genres)
});


router.get('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`There is no genre with ID ${req.params.id}`)

    res.send(genre)
});


router.post('/api/genres', (req, res) => {

    const { error } = validateGenre(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre)
    res.send(genre)
});

router.put('/api/genres/:id', (req, res) => {

    const genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`There is no genre with ID ${req.params.id}`)

    const { error } = validateGenre(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name;

    res.send(genre)
});

router.delete('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`There is no genre with ID ${req.params.id}`)

    const genreIndex = genres.indexOf(genre)
    genres.splice(genreIndex, 1)

    res.send(genre)
})


module.exports = router;