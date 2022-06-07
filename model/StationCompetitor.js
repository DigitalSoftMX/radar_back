const mongoose = require('mongoose')

let schema = mongoose.Schema
const competitorsSchema = new schema({
    peso: {
        type: Boolean,
        default: false
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
    prices: [{
        type: schema.Types.ObjectId,
        required: [true, 'Los precios son requeridos']
    }]
}, { timestamps: {}})

module.exports = mongoose.model('competitor', competitorsSchema)