const{ xmlToJson } = require("./xmlToJson")
let placeYPrice = {    
}
async function Price() {
    const urlPrices = 'http://publicacionexterna.azurewebsites.net/publicaciones/prices'
    let price = {}
    intervalFunc =  await xmlToJson(urlPrices).then((data)=>{
        price = data['places']['place']
        //setTimeout(Place, 150);
    })
    console.table(price); 
    return placeYPrice
}
module.exports = { Price } 