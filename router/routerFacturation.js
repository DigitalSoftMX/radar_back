//===============================================================================================
//            LIBS
//===============================================================================================

const verifyToken = require('../function/serveResp')
const facturationController = require('../controller/FacturationController')
const express = require('express')
const app = express()


//===============================================================================================
//             ROUTER CHILDREN
//===============================================================================================

app.post('/newCostumer',facturationController.newCostumer)
app.get('/servicesAndProduct',facturationController.servicesAndproduct)
app.post('/newOrganization',facturationController.newOrganization) 
module.exports = app
