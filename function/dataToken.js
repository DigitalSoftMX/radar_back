const jwt = require('jsonwebtoken')
const  serveResp = require('./serveResp')

function dataToken(token){
    if (!token) {
        error = {error: 'Acceso denegado'}
        serveResp(null, error,'Acceso no autorizado', 401, res)
    } else {
        let tokenDecode = ''
        jwt.verify(token,process.env.SEED,(error,decode)=>{
            if (error) {
                return error
            } else {
                tokenDecode = decode
                //return decode
            }
        })
        return tokenDecode
    }
 }

module.exports = dataToken