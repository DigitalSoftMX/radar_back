const mongoose = require ('mongoose')


let Schema = mongoose.Schema
const purchaseSchema = new Schema({
    purchaseRegular: {
        type: Array,
        trim: true,
    },
    purchasePremium: {
        type: Array,
        trim: true,
    },
    purchaseDiesel: {
        type: Array,
        trim: true,
    },
    recommendedRegular:{
        type:Array,
        trim: true,
    },
    recommendedPremium:{
        type: Array,
        trim: true,
    },
    recommendedDiesel:{
        type: Array,
        trim: true,
    }
}, { timestamps: {}})

module.exports = mongoose.model('purchase', purchaseSchema)