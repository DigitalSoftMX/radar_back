const PORT = process.env.PORT || 3200
require('dotenv').config()
let URI = process.env.URI
let TAXAPI = process.env.FACTURA_API
module.exports = {
    PORT,
    URI,
    TAXAPI
}