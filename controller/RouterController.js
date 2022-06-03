const{ Place } = require("../function/place")
const{ Price } = require("../function/price")
const{ placesReposta } = require("../function/placesReposta")
const serveResp = require("../function/serveResp")
/* la de estaciones es cada 24 horas y la de precios es cada 30 min */


//!==============================================================================================
//!            MEDIA 
//!==============================================================================================
exports.PlacesYPrices = async function(req, res) {
    const error = { error: 'La request no tiene data'}
    try {
/*          x  = await Place()
         y  = await Price() */
        z = await  placesReposta()
        //Location.push(Price)
/*         for (let i = 0; i < 10; i++) {
                //console.log(Place[4])
                console.log(Place[i]);
                console.log("y:",Place[i].location[0].y[0],"x:",Place[i].location[0].x[0]);
                const urlLocation = `https://maps.googleapis.com/maps/api/place/nearbysearch/xml?location=${Place[i].location[0].y[0]},${Place[i].location[0].x[0]}&radius=28&type=gas_station&keyword=gas_station&key=AIzaSyDAYDRUB8-MNmO6JAy0aHaNaOKmE5VZHpI`
                await xmlToJson(urlLocation).then((data)=>{
                    //console.log(data);
                    Location.push(data)
                    //console.dir(data)
                })
        } 

         for (let i = 0; i < Location; i++) {
            console.table(Location[i].PlaceSearchResponse.result)
        }  */


      serveResp(z, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        console.log(error); 
        serveResp( error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}