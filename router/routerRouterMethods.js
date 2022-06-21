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
app.get('/pricesByWeek/',routerController.PlacesYPricesByWeek)
app.post('/purcharseDay/',routerController.PlacesYPricesByWeek)

module.exports = app