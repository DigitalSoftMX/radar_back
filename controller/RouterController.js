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
/*         let datePurchase = await Purchase.find({
            $or: [
                { 'purchaseRegular_date': { $lte : dateActually } },
                { 'purchasePremium_date': { $lte : dateActually } },
                { 'purchaseDiesel_date': { $lte : dateActually } },
                { 'recommendedRegular_date': { $lte : dateActually } },
                { 'recommendedPremium_date': { $lte : dateActually } },
                { 'recommendedDiesel_date': { $lte : dateActually } },
            ]
        }) */
        console.log(dateActually);
        let datePurchase = await Purchase.find({ 'createdAt': {$gte: dateActually}})
        //.sort({$natural:-1})
        console.log(datePurchase[datePurchase.length -1])
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
           dataPrice.push({
            'stationName':foundCree?.companyName,
            'CRE':foundCree?.CRE,
            'prices':dataContent,
            'competions':temp,
            'purchasePrice':datePurchase[0]
            })
        });
      serveResp(dataPrice, 'Se creó satisfactoriamente la categoria', 201, res)
    } catch (error) {
        console.log(error) 
        serveResp( error, 'Se creó satisfactoriamente la categoria', 201, res)
    } 
}

exports.PurchaseDay = async function(req, res) {

    try {

        const purchaseRegular_price =  req.body?.purchaseRegular?.price
        const purchaseRegular_date =  req.body?.purchaseRegular?.date
        const purchasePremium_price =  req.body?.purchasePremium?.price
        const purchasePremium_date =  req.body?.purchasePremium?.date
        const purchaseDiesel_price =  req.body?.purchaseDiesel?.price
        const purchaseDiesel_date =  req.body?.purchaseDiesel?.date
        const recommendedRegular_price = req.body?.recommendedRegular?.price
        const recommendedRegular_date = req.body?.recommendedRegular?.date
        const recommendedPremium_price = req.body?.recommendedPremium?.price
        const recommendedPremium_date = req.body?.recommendedPremium?.date
        const recommendedDiesel_price = req.body?.recommendedDiesel?.price 
        const recommendedDiesel_date = req.body?.recommendedDiesel?.date

        purcharseData = new Purchase({
             purchaseRegular_price: purchaseRegular_price,
             purchaseRegular_date: purchaseRegular_date,
             purchasePremium_price: purchasePremium_price, 
             purchasePremium_date: purchasePremium_date,
             purchaseDiesel_price: purchaseDiesel_price,
             purchaseDiesel_date: purchaseDiesel_date,
             recommendedRegular_price: recommendedRegular_price,
             recommendedRegular_date: recommendedRegular_date,
             recommendedPremium_price: recommendedPremium_price,
             recommendedPremium_date: recommendedPremium_date,
             recommendedDiesel_price: recommendedDiesel_price,
             recommendedDiesel_date: recommendedDiesel_date,
             status: req.body?.stat
        })
        dataPrice = await purcharseData.save()

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