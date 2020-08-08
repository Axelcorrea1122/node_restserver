const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //paquete para manejar los errores la condicion es que el campo que sea unico debe tener la propiedad unique: true

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

const Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],

    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

usuarioSchema.methods.toJSON = function() { //NO USAR FUNCION FLECHA PORQUE SE NECESITA USAR EL THIS
    let user = this;
    let userObject = user.toObject();
    delete userObject.password

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' }) //Para manejar la estructura del error cuando un campo de la db deba ser unico

module.exports = mongoose.model('Usuario', usuarioSchema);