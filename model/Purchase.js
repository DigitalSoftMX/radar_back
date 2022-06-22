const mongoose = require ('mongoose')


let Schema = mongoose.Schema
const purchaseSchema = new Schema({
    purchaseRegular_prices: {
        type: String,
        trim: true,
    },
    purchaseRegular_date: {
        type: String,
        trim: true,
    },
    purchasePremium_prices: {
        type: String,
        trim: true,
    },
    purchasePremium_date: {
        type: String,
        trim: true,
    },
    purchaseDiesel_prices: {
        type: String,
        trim: true,
    },
    purchaseDiesel_date: {
        type: String,
        trim: true,
    },
    recommendedRegular_prices:{
        type:String,
        trim: true,
    },
    recommendedRegular_date:{
        type:String,
        trim: true,
    },
    recommendedPremium_prices:{
        type: String,
        trim: true,
    },
    recommendedPremium_date:{
        type: String,
        trim: true,
    },
    recommendedDiesel_prices:{
        type: String,
        trim: true,
    },
    recommendedDiesel_date:{
        type: String,
        trim: true,
    }
}, { timestamps: {}})

module.exports = mongoose.model('purchase', purchaseSchema)