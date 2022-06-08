require('dotenv').config()
const PORT = process.env.PORT || 3200
const URI = process.env.URI
console.log(URI);
module.exports = {
    PORT,
    URI
}