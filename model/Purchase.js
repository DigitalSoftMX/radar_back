const mongoose = require ('mongoose')


let Schema = mongoose.Schema
const purchaseSchema = new Schema({
    price: [{
        type: Array,
    }],
    purchaseDate: {
        type: Date,
        trim: true,
        required: [true, 'La fecha de compra es requerida']
    }
}, { timestamps: {}})

module.exports = mongoose.model('purchase', purchaseSchema)