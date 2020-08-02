require('./config/config');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json()) //Middlewares queutiliza el body-parser

app.get('/usuario', function(req, res) {
    res.json('Get Usuario')
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            Persona: body
        });
    }

})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    res.json({
        id
    })
})

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id
    res.json({
        id
    })
})

app.listen(process.env.PORT, () => console.log(`Escuchando en el puerto ${process.env.PORT}`))