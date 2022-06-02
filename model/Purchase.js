const mongoose = require ('mongoose')


let Schema = mongoose.Schema
const purchaseSchema = new Schema({
    station: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: [true, 'La estación es requerida']
    },
    price: {
        type: Number,
        trim: true, 
        required: [true, 'El precio es requerido']
    },
    purchaseDate: {
        type: Date,
        trim: true,
        required: [true, 'La fecha de compra es requerida']
    }
}, { timestamps: {}})

module.exports = mongoose.model('purchase', purchaseSchema)