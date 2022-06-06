const{ xmlToJson } = require("./xmlToJson")
async function Price() {
    const urlPrices = 'http://publicacionexterna.azurewebsites.net/publicaciones/prices'
    let price = {}
    intervalFunc =  await xmlToJson(urlPrices).then((data)=>{
        price = data['places']['place']

        for (let i = 0; i < data['places']['place'].length; i++) {
            const element = data['places']['place'][i]
            for (let y = 0; y < element.gas_price.length; y++) {
                const elem = element.gas_price
                if (element?.$?.place_id == '10557') {
                    
                    console.log(elem);
                }
            } 
        }
        //setTimeout(Price, 150);
    })
    return price
}
module.exports = { Price } 