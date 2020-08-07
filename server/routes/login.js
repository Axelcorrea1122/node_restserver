const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken')


app.post('/login', (req, res) => {
    let body = req.body

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectas'
                    }
                })
            }

            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectas'
                    }
                })
            }

            let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }) //seg * min * horas * dias 

            return res.json({
                usuario: usuarioDB,
                token
            })
        }


    )
})


module.exports = app;