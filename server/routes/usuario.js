const express = require('express')
const app = express()

const Usuario = require('../models/usuario');





app.get('/usuario', function(req, res) {
    res.json('Get Usuario')
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        })
    })

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


module.exports = app;