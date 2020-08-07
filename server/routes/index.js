const express = require('express')
const app = express();

app.use(require('./usuario'))
app.use(require('./login'))


/* module.exports = {
    app
} */ //si se exporta asi se debe usar destructuring o especifica en el middleware.app

module.exports = app; //en cambio si se especifica no hay de que hacer destructuring ni acceder con .