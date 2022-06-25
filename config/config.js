const PORT = process.env.PORT || 3200
require('dotenv').config()
let URI = 'mongodb+srv://Onexpo:x4IIGYxGgVClnYC8@cluster0.9lsvc.mongodb.net/radar?retryWrites=true&w=majority'
let TAXAPI = process.env.FACTURA_API
module.exports = {
    PORT,
    URI,
    TAXAPI
}