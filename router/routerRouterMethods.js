//===============================================================================================
//            LIBS
//===============================================================================================

const verifyToken = require('../function/serveResp')
const routerController = require('../controller/RouterController')
const express = require('express')
const app = express()

//===============================================================================================
//             ROUTER CHILDREN
//===============================================================================================

//app.get('/PlacesYPrices',routerController.PlacesYPrices)
app.get('/',routerController.PlacesYPrices)
app.get('/prices',routerController.PlacesYPricesExcel)
app.get('/pricesByDay/',routerController.PlacesYPricesByDay)
app.post('/pricesByWeek/:date',routerController.PlacesYPricesByWeek)
app.post('/download/excel',routerController.DownloadExcel)

module.exports = app