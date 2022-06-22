const mongoose = require ('mongoose')


let Schema = mongoose.Schema
const purchaseSchema = new Schema({
    purchaseRegular_price: {
        type: String,
        trim: true,
    },
    purchaseRegular_date: {
        type: String,
        trim: true,
    },
    purchasePremium_price: {
        type: String,
        trim: true,
    },
    purchasePremium_date: {
        type: String,
        trim: true,
    },
    purchaseDiesel_price: {
        type: String,
        trim: true,
    },
    purchaseDiesel_date: {
        type: String,
        trim: true,
    },
    recommendedRegular_price:{
        type:String,
        trim: true,
    },
    recommendedRegular_date:{
        type:String,
        trim: true,
    },
    recommendedPremium_price:{
        type: String,
        trim: true,
    },
    recommendedPremium_date:{
        type: String,
        trim: true,
    },
    recommendedDiesel_price:{
        type: String,
        trim: true,
    },
    recommendedDiesel_date:{
        type: String,
        trim: true,
    }
}, { timestamps: {}})

module.exports = mongoose.model('purchase', purchaseSchema)