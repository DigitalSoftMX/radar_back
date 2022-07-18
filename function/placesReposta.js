const { reductionJson } = require("../helpers/reductionJson")
<<<<<<< HEAD

async function placesReposta() {
    let Stations = await reductionJson()
=======
const station = require("../helpers/station")

async function placesReposta() {
    let Stations = await reductionJson(station)
>>>>>>> 009c9878cc2849b5bf99645a3b8ff1dc5f2bfe95
    return Stations 
}

module.exports = { placesReposta } 
//350,000 7 min y medio
//900,000 15 min
//1,800,000 30 min
//3,600,000 1 hora
//86,400,000 1 dia 24 de cada mes 11 de cada mes 