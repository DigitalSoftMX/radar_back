require('dotenv').config()
const PORT = process.env.PORT || 3200
const URI = 'mongodb+srv://Onexpo:x4IIGYxGgVClnYC8@cluster0.9lsvc.mongodb.net/reposta?retryWrites=true&w=majority'
console.log(URI);
module.exports = {
    PORT,
    URI
}