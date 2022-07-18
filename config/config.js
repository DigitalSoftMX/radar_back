require('dotenv').config()
<<<<<<< HEAD
let URI = 'mongodb+srv://Onexpo:x4IIGYxGgVClnYC8@cluster0.9lsvc.mongodb.net/radar?retryWrites=true&w=majority'
let TAXAPI = process.env.FACTURA_API
=======
const PORT = process.env.PORT || 3200
const URI = 'mongodb+srv://Onexpo:x4IIGYxGgVClnYC8@cluster0.9lsvc.mongodb.net/reposta?retryWrites=true&w=majority'
>>>>>>> 009c9878cc2849b5bf99645a3b8ff1dc5f2bfe95
module.exports = {
    PORT,
    URI 
}