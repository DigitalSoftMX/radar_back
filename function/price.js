const{ xmlToJson } = require("./xmlToJson")
async function Price() {
    const urlPrices = 'http://publicacionexterna.azurewebsites.net/publicaciones/prices'
    let price = {}
    intervalFunc =  await xmlToJson(urlPrices).then((data)=>{
        price = data['places']['place']
        //setTimeout(Price, 350);
    })
    return price
}
module.exports = { Price } 