const mongoose = require('mongoose')

let schema = mongoose.Schema
const competitorsSchema = new schema({
    peso: {
        type: String
    },
    distance: {
        type: Number
    },
    CRE: {
        type: String, 
        trim: true, 
        index: {sparse: true, unique: true}, 
        match: [ /[A-ZÑ&]{2}[/][0-9]{4,}[/][A-ZÑ&]{3}[/][A-ZÑ&]{2}[/][0-9]{4}$/i, 'Ingrese un CRE válido']
    },
    companyName: {
        type: String,
        required: [true, 'El nombre de la compañia es requerido']
    },
    adress: {
        type: String,
        required: [true, 'La dirección es requerida']
    },
    flag: {
        type: String,
        required: [true, 'La bandera es requerida']
    },
    prices: {
        type: schema.Types.ObjectId,
        required: [true, 'Los precios son requeridos']
    }
}, { timestamps: {}})

module.exports = mongoose.model('competitor', competitorsSchema)