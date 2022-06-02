const{ xmlToJson } = require("./xmlToJson")
async function Price() {
    const urlPrices = 'http://publicacionexterna.azurewebsites.net/publicaciones/prices'
    let price = {}
    intervalFunc =  await xmlToJson(urlPrices).then((data)=>{
        price = data['places']['place']

        for (let i = 0; i < data['places']['place'].length; i++) {
            const element = data['places']['place'][i]
            //console.log(element);
            //console.log('place_id:',element?.$?.place_id);
            for (let y = 0; y < element.gas_price.length; y++) {
                const elem = element.gas_price
                if (element?.$?.place_id == '10557') {
                    
                    console.log(elem);
                }
                /* console.log('price', elem?._);
                console.log('type', elem?.$?.type); */
                
            } 
        }
        //setTimeout(Price, 150);
    })
    return price
}
module.exports = { Price } 