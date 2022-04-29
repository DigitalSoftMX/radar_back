const{ xmlToJson } = require("../function/xmlToJson")
const serveResp = require("../function/serveResp")
/* la de estaciones es cada 24 horas y la de precios es cada 30 min */


//!==============================================================================================
//!            MEDIA 
//!==============================================================================================
exports.PlacesYPrices = async function(req, res) {
    const error = { error: 'La request no tiene data'}
    try {
        const urlPlaces = 'https://publicacionexterna.azurewebsites.net/publicaciones/places'
        const urlPrices = 'https://publicacionexterna.azurewebsites.net/publicaciones/prices'
        let Place, Price, Location = {}
        let placeYPrice = {
            
        }
        await xmlToJson(urlPrices).then((data)=>{
            Price = data['places']['place']
        })
        await xmlToJson(urlPlaces).then((data)=>{
            Place = data['places']['place']
        })
        for (let i = 0; i < 10; i++) {
            if (Place[i] == 4) {
                const urlLocation = `https://maps.googleapis.com/maps/api/place/nearbysearch/xml?location=${Place[i].location[0].y[0]},${Place[i].location[0].x[0]}&radius=20&type=gas_station&key=AIzaSyDAYDRUB8-MNmO6JAy0aHaNaOKmE5VZHpI`
                await xmlToJson(urlLocation).then((data)=>{
                    Location = data
                    //console.dir(data)
                })
            }
        } 

/*          for (let i = 0; i < 1; i++) {
            console.log('y',Place[i].location[0].x[0]);
            console.log('x',Place[i].location[0].y[0]);
        }  */

        serveResp(Location, null, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        console.log(error);
        serveResp(null, error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}