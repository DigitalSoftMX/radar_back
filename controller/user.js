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

exports.login = async function(req, res) {
    const body = req.body
    const dataTokenSentFront = {
        token: null,
        DataUser: null,
        refreshToken: null
    }
    const errorObject = { error: 'No tiene data '}
    y = filterValidation(validationResult(req).errors)
    console.log(y);
    serveResp(y,'Error',406,res)
    if (Object.entries(body).length === 0) {
    } else {
        try {
            const userRequestLogin  = await modelUser.find({ user: body.email }).populate('role','name').populate('refreshToken', 'token').exec()
            console.log(userRequestLogin);
             if (userRequestLogin !== null) {
                if (userRequestLogin[0].emailValidation == true && userRequestLogin[0].status == true) {
                    if (!bcrypt.compareSync(body.password, userRequestLogin[0].password)) {
                        serveResp(errorObject,'El usuario o la contraseña incorrectas',401,res)
                    } else { 
                        let roleName = userRequestLogin[0].role.name
                        let roleTokenExpire = userToken(roleName)

                        const userTokenInit = jwt.sign({
                            id: userRequestLogin[0]._id,
                            role:  userRequestLogin[0].role,
                        }, process.env.SEED , {expiresIn: roleTokenExpire})
                        userRequestLogin.password = '************'
                        
                        const userTokenRefesh = jwt.sign({
                            id: userRequestLogin[0]._id,
                            role:  userRequestLogin[0].role,
                        },process.env.SEED, {expiresIn: process.env.EXPIRESINRT})
        
                        await modelRefreshToken.findOne({user: userRequestLogin[0]._id}).remove().exec()
        
                        const refreshToken = new modelRefreshToken({
                                user:  userRequestLogin[0]._id,
                                role:  userRequestLogin[0].role,
                                token: userTokenRefesh,
                        })
                        
                        const newRefreshToken = await refreshToken.save()
                        
                        modelUser.findByIdAndUpdate(userRequestLogin[0]._id,{
                            "refreshToken": newRefreshToken._id
                        }).exec()
                        
                        dataTokenSentFront.token = userTokenInit
                        dataTokenSentFront.userID = userRequestLogin[0]._id
                        dataTokenSentFront.refreshToken = userTokenRefesh

        
                        serveResp(dataTokenSentFront,'Bienvenido a Onexpo',201,res)
                    }
                } else {
                    serveResp(errorObject,'el correo no se ha validado',400,res) 
                }
             }else
            {
                serveResp(errorObject,'no se encontro el usuario',400,res)
            } 
        } catch (error) {
            console.log(error);
            serveResp(error,'error en los datos',400,res)
        }
    } 
}