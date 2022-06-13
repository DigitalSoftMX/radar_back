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
app.post('/pricesByWeek/:data',routerController.PlacesYPricesByWeek)
module.exports = app