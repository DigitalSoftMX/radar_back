//===============================================================================================
//            LIBS
//===============================================================================================

const User = require('../model/User')
const serveResp = require('../function/serveResp')

//===============================================================================================
//            Registro Usuario
//===============================================================================================

exports.register = async function(req, res) {
    const body = req.body
    if (Object.entries(body).length === 0) {
        serveResp(error, 'No se encontró ningún contenido', 406, res)
    } else {
        try {
            const newUser = new User(body)
            if (body.password == '' || undefined) {
                serveResp(error, 'Ingrese una contraseña valida', 400, res)
            } else {
                userInfo = await newUser.save()
            }
        } catch (error) {
            serveResp(error, 'Error en los datos', 400, res)
        }
    }
}