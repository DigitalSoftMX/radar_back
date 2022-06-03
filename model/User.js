const mongoose = require('mongoose')

let Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        trim: true, 
        required: [true, 'La contraseña es requeridas'],
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 'Ingrese un correo valido' ]
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es requerido']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'El apellido es requerido']
    }
}, { timestamps: {} })

module.exports = mongoose.model('user', userSchema)