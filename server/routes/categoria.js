const express = require('express');
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();
const Categoria = require('../models/categoria');
const Usuario = require('../models/usuario');

//Mostrar todas las categorias

app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find()
        .sort('descripcion') //ordena los resultados segun el campo especificado
        .populate('usuario', 'nombre email') //se especifica que relacion se encuentra en el documento en este caso usuario y el segundo argumento son los elemento que quiero traer de esa relacion 
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                categorias
            })
        })
});



//Mostrar una categoria por ID
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id es incorrecto'
                }
            })
        }


        res.json({
            ok: true,
            categoria: categoriaBD
        });



    });
});



//Crea una categoria y regresa la nueva
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});



//Actualiza una categoria
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, {
        new: true,
        runValidators: true /* PARA QUE VALIDE LAS REGLAS DEL UNIQUEVALIDATOR */
    }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: 'El id no existe'
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    })
});

//borrado fisico de una categoria
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });

    })
});

/* 




 */


module.exports = app;