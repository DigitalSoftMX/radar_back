const{ xmlToJson } = require("./xmlToJson")
let placeYPrice = {    
}
async function Place() {
    const urlPlaces = 'http://publicacionexterna.azurewebsites.net/publicaciones/places'
    let places = {}
    intervalFunc =  await xmlToJson(urlPrices).then((data)=>{
        places = data['places']['place']
        setTimeout(Place, 150);
    })
    return places
}
module.exports = { Place } 