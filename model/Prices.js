const mongoose = require('mongoose')

let Schema = mongoose.Schema
const pricesSchema = new Schema({
    prices: [{
        type: Array,
        trim: true
    }],
    stationId: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: [true, 'No se encontró un ID'],
        ref: 'station'
    }
}, { timestamps: {} })

module.exports = mongoose.model('price', pricesSchema)