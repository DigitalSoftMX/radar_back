const mongoose = require('mongoose')

let Schema = mongoose.Schema
const stationSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre de la estación es requerido']
    },
    CRE: {
        type: String,
        trim: true,
        unique: true,
        match: [ /[A-ZÑ&]{2}[/][0-9]{4,}[/][A-ZÑ&]{3}[/][A-ZÑ&]{2}[/][0-9]{4}$/i, 'Ingrese un CRE válido']
    },
    competitors: {
        type: Schema.Types.ObjectId,
        trim: true,
        ref: 'competitor'
    }
})

module.exports = mongoose.model('station', stationSchema)