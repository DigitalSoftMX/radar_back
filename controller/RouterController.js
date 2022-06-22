const{ placesData } = require("../helpers/placedata")
const serveResp = require("../function/serveResp")
const { datatoprintExcel } = require("../helpers/dataExcel")
const stationscompetitions = require("../helpers/stationscompetitions")
const compareDate = require("../helpers/compareDate")
const rangeDates = require("../helpers/rangeDates")
const Purchase = require('../model/Purchase')
let dataPrice = []
let temp = []
const today = new Date();
var getToday = today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()
/* la de estaciones es cada 24 horas y la de precios es cada 30 min */

//!==============================================================================================
//!            MEDIA 
//!==============================================================================================
exports.PlacesYPrices = async function(req, res) {
    const error = { error: 'La request no tiene data'}
    try {
        z = await  placesData()
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

exports.PlacesYPricesByDay = async function(req, res) {
    dataPrice = []
    const dateActually = req.query.date
    try {
        let dataCree = await datatoprintExcel()
        stationscompetitions.forEach(async station => {
            const foundCree =  dataCree.find(element => element.CRE == station.cre_id)
            //console.log(foundCree);
            dateCreBase = foundCree?.prices[0].prices
            temp = []
            station.competitions.forEach(stationCompe => {
                let dataCompe = []
                const foundCreeCompe =  dataCree.find(element => element.CRE == stationCompe)
                //console.log(foundCreeCompe);
                dateCreCompe = foundCreeCompe?.prices[0].prices
                dataCompe = compareDate(dateCreCompe, dateActually)
                temp.push({'stationName':foundCreeCompe.companyName,'CRE':foundCreeCompe.CRE,'prices':dataCompe})

            })
           dataContent =  compareDate(dateCreBase, dateActually)
           dataPrice.push({'stationName':foundCree?.companyName,'CRE':foundCree?.CRE,'prices':dataContent ,'competions':temp })
        });
/*         function obtenerInicioYFinSemana(fecha) {
            return {
                inicio: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - fecha.getDay() + 1),
                fin: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 6 - fecha.getDay()),
            }
        } */
      serveResp(dataPrice, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        console.log(error) 
        serveResp( error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}

exports.PurchaseDay = async function(req, res) {

    try {

        const purchaseRegular =  req.body?.purchaseRegular
        const purchasePremium =  req.body?.purchasePremium
        const purchaseDiesel =  req.body?.purchaseDiesel
        const recommendedRegular = req.body?.recommendedRegular
        const recommendedPremium = req.body?.recommendedPremium
        const recommendedDiesel = req.body?.recommendedDiesel 

        const purcharseday = Purchase.find();
        console.log(purcharseday);
        if (purcharseday.legth == 0) {

        purcharseData = new Purchase({
                purchaseRegular: purchaseRegular, 
                purchasePremium: purchasePremium,
                purchaseDiesel: purchaseDiesel,
                recommendedRegular: recommendedRegular,
                recommendedPremium: recommendedPremium,
                recommendedDiesel: recommendedDiesel
        })
        dataPrice = await purcharseData.save()
            
        } else {
            purchaseRegular = { purchaseRegular: req.body?.purchaseRegular } 
            purchasePremium = { purchasePremium: req.body?.purchasePremium }
            purchaseDiesel  = { purchaseDiesel: req.body?.purchaseDiesel }
            recommendedRegular = { recommendedRegular: req.body?.recommendedRegular }
            recommendedPremium = { recommendedPremium: req.body?.recommendedPremium }
            recommendedDiesel = { recommendedDiesel: req.body?.recommendedDiesel }
            
        dataPrice =  await Purchase.findByIdAndUpdate(purcharseday[0]._id,
                {$push:purchaseRegular, $push:purchasePremium, $push:purchaseDiesel,  
                 $push:recommendedRegular, $push:recommendedPremium, $push:recommendedDiesel},{new:true})
        } 
        console.log(dataPrice);
      serveResp(dataPrice, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        serveResp( error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}
exports.PlacesYPricesByWeek = async function(req, res) {
    let dataPrice = []
    let temp = []
    try {
        let dataCree = await datatoprintExcel()
        const dateInint = new Date(req.query.dateInit).getTime()
        const dateFinal = new Date(req.query.dateFinal).getTime()
        const dateRow = new Date(req.query.dateInit)
    
        const diff = dateFinal - dateInint
        console.log(diff/(1000*60*60*24));
        const dates = []
        for (let dateRange = 0; dateRange <= (diff/(1000*60*60*24)+1); dateRange++) {
            const dateRangeUp = dateRow.getFullYear() + "-" + `${(dateRow.getMonth()+1)}`.padStart(2,'0') +"-" + (dateRow.getDate()+ dateRange)
            console.log(dateRange+'-.'+dateRangeUp)
            dates.push(dateRangeUp)
        }
        stationscompetitions.forEach(async station => {
            const foundCree =  dataCree.find(element => element.CRE == station.cre_id)
            //console.log(foundCree);
            dateCreBase = foundCree?.prices[0].prices
            temp = []
            station.competitions.forEach(stationCompe => {
                let dataCompe = []
                const foundCreeCompe =  dataCree.find(element => element.CRE == stationCompe)
                //console.log(foundCreeCompe);
                dateCreCompe = foundCreeCompe?.prices[0].prices
                dataCompe = rangeDates(dateCreCompe, dates)
                temp.push({'stationName':foundCreeCompe.companyName,'CRE':foundCreeCompe.CRE,'prices':dataCompe})

            })
           dataContent =  rangeDates(dateCreBase, dates)
           dataPrice.push({'stationName':foundCree?.companyName,'CRE':foundCree?.CRE,'prices':dataContent ,'competions':temp })
        })
      serveResp(dataPrice, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        serveResp( error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}


exports.DownloadExcel = async function(req, res) {

 /*    try {
        let dataCree = await datatoprintExcel()
        for (let i = 0; i < dataCree.length; i++) {
            for (let o = 0; o < dataCree[i].competions.length; o++) {
                console.log(o+'.-'+dataCree[i].competions[o].prices);
            }
        }

      serveResp(dataCree, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        serveResp( error, 'Se creó satisfactoriamente la categoria', 201, res)
    }  */
}