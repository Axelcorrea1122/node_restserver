const express = require('express')
const app = express()
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const _ = require('underscore') //para filtrar objectos





app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img') //el array vacio ahi se pueden especificar filtros para la busqueda por ejemplo { google: true }
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => { // cuenta la cantidad de registros el array vacio ahi se pueden especificar filtros para la busqueda por ejemplo { google: true }

                return res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })

            })
        })
})

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //funcion para que encrypte la pass el entero 10 es la cantidad de vuelta que va a realizar la encriptacion
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

app.put('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //para filtrar el json y quitarle la property pssword para que no se actualize 

    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true /* PARA QUE VALIDE LAS REGLAS DEL UNIQUEVALIDATOR */
    }, (err, usuarioBD) => {
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



app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id
    let cambiaEstado = {
        estadp: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioEliminado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            if (!usuarioEliminado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                })
            }
            res.json({
                ok: true,
                usuario: usuarioEliminado
            })
        }) //Con esta parte del codigo borramos el usuario logicamente cambiandole el estado a false
        /* Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            if (!usuarioEliminado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                })
            }

            res.json({
                ok: true,
                usuario: usuarioEliminado
            })
        }) */ //TODA ESTA FUNCION DELETE BORRA EL REGISTRO FISICAMENTE DE LA BD
})



module.exports = app;