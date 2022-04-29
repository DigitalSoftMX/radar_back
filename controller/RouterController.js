const{ xmlToJson, googlePace } = require("../function/xmlToJson")
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
        let Place, Price = {}
        let placeYPrice = {
            
        }
        let location = []
        await xmlToJson(urlPrices).then((data)=>{
            Price = data['places']['place']
        })
        await xmlToJson(urlPlaces).then((data)=>{
            Place = data['places']['place']
        })
        for (let i = 0; i < 1; i++) {
            const urlLocation = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Place[i].location[0].y[0]},${Place[i].location[0].x[0]}&radius=1000&type=gas_station&keyword=cruise&key=AIzaSyDAYDRUB8-MNmO6JAy0aHaNaOKmE5VZHpI`
            await googlePace(urlLocation).then((data)=>{
                location.push(data)
                console.dir(data)
            })
        } 

/*          for (let i = 0; i < Place.length; i++) {
            console.log('y',Place[i].location[0].x[0]);
            console.log('x',Place[i].location[0].y[0]);
        } 
 */
        serveResp(location, null, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        console.log(error);
        serveResp(null, error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}