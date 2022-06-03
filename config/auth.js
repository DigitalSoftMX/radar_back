const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken')
const  serveResp = require('../function/serveResp')
var express = require('express');
var app = express();
/* require('../controller/userController')(app); */

function verifyToken(req, res, next) {
    const token = req.header('Authorization')
    if (!token) {
        error = {error: 'Acceso denegado'}
        serveResp(null, error,'Acceso no autorizado', 401, res)
    } else {
        jwt.verify(token,process.env.SEED,(error,decode)=>{
            if (error) {
                serveResp(null,error,'Token ivalido',403,res)
            } else {
                req.id = decode.id
                next()
            }
        })
    }
}
module.exports = verifyToken