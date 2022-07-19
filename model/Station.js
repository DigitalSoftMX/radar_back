const mongoose = require('mongoose')

let schema = mongoose.Schema
const stationSchema = new schema({
    companyName: {
        type: String,
        trim: true,
        required: [true, 'El nombre de la estación es requerido']
    },
    CRE: {
        type: String,
        trim: true,
        unique: true,
<<<<<<< HEAD
        match: [ /[A-ZÑ&]{2}[/][0-9]{3,}[/][A-ZÑ&]{3}[/][A-ZÑ&]{2}[/][0-9]{4}$/i, 'Ingrese un CRE válido']
=======
        match: [ /[A-ZÑ&]{2}[/][0-9]{4,}[/][A-ZÑ&]{3}[/][A-ZÑ&]{2}[/][0-9]{4}$/i, 'Ingrese un CRE válido']
>>>>>>> 009c9878cc2849b5bf99645a3b8ff1dc5f2bfe95
    },
    prices: [{
        type: schema.Types.ObjectId,
        required: [true, 'Los precios son requeridos'],
        ref:'price'
    }],
    competitor:{
        type: Boolean,
        default: false
    }
}, { timestamps: {} })

module.exports = mongoose.model('station', stationSchema)