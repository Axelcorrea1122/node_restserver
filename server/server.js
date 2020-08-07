require('./config/config');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json()) //Middlewares queutiliza el body-parser

app.use(require('./routes/index')) //para importa el archivo que tiene las rutas de usuario





mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) throw err
    else console.log('Se realizo la conexion')
});



app.listen(process.env.PORT, () => console.log(`Escuchando en el puerto ${process.env.PORT}`))