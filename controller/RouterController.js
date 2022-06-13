const{ Place } = require("../function/place")
const{ Price } = require("../function/price")
const{ placesData } = require("../helpers/placedata")
const serveResp = require("../function/serveResp")
const Prices = require("../model/Prices")
const { datatoprintExcel } = require("../helpers/dataExcel")

/* la de estaciones es cada 24 horas y la de precios es cada 30 min */


//!==============================================================================================
//!            MEDIA 
//!==============================================================================================
exports.PlacesYPrices = async function(req, res) {
    const error = { error: 'La request no tiene data'}
    try {
        z = await  placesData()
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
exports.PlacesYPricesExcel = async function(req, res) {
    const error = { error: 'La request no tiene data'}
    try {
        let x = await datatoprintExcel()
      serveResp(x, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        console.log(error); 
        serveResp( error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}

exports.PlacesYPricesByWeek = async function(req, res) {
    const dateActually = req.params.date
    const error = { error: 'La request no tiene data'}
    try {
        let dataCree = await datatoprintExcel()
        for (let i = 0; i < dataCree.length; i++) {
            for (let o = 0; o < dataCree[i].competions.length; o++) {
                console.log(o+'.-'+dataCree[i].competions[o].prices);
            }
        }
/*         function obtenerInicioYFinSemana(fecha) {
            return {
                inicio: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - fecha.getDay() + 1),
                fin: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 6 - fecha.getDay()),
            }
        } */
      serveResp(dataCree, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        console.log(error) 
        serveResp( error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}