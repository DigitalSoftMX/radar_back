const serveResp = (data, error, message, code, resp) => {
    switch (code) {
        case 200:
        //La solicitud se ha realizado correctamente.
            return resp.status(200)
                .json({
                    ok: true,
                    message,
                    data
                })
            break;
        case 201:
        //La solicitud se ha realizado correctamente y, como resultado, se ha creado un nuevo recurso
            return resp.status(201)
                .json({
                    ok: true,
                    message,
                    data
                })
            break;
        case 204:
        //No hay contenido para enviar para esta solicitud,
            return resp.status(204)
                .json({
                    ok: true,
                    message,
                    data
                })
            break;
        case 206:
        //La solicitar solo una parte de un recurso.
            return resp.status(206)
                .json({
                    ok: true,
                    message,
                    data
                })
            break;
        case 400:
        //El servidor no pudo entender la solicitud debido a una sintaxis no válida.
            return resp.status(400)
                .json({
                    ok: false,
                    message,
                    error
                })
            break;
        case 401:
        //El cliente debe autenticarse para obtener la respuesta solicitada.
            return resp.status(401)
                .json({
                    ok: false,
                    message,
                    error
                })
            break;
            case 402:
                //El pago es requerido.
                    return resp.status(402)
                        .json({
                            ok: false,
                            message,
                            error
                        })
                    break;
        case 403:
        //El servidor se niega a proporcionar el recurso solicitado por que el cliente no tiene derechos de acceso.
            return resp.status(403)
                .json({
                    ok: false,
                    message,
                    error
                })
            break;
        case 406:
        //No encuentra ningún contenido que se ajuste a los criterios dados por el agente de usuario.
            return resp.status(406)
                .json({
                    ok: true,
                    message,
                    error
                })
            break;
        case 500:
        //El servidor se ha encontrado con una situación que no sabe cómo manejar.
            return resp.status(500)
                .json({
                    ok: true,
                    message,
                    error
               })
            break;
        case 501:
        //El método de solicitud no es compatible con el servidor y no se puede manejar.
            return resp.status(501)
                .json({
                    ok: true,
                    message,
                    error
                })
            break;
            case 511:
                //El método de solicitud no es compatible con el servidor y no se puede manejar.
                    return resp.status(511)
                        .json({
                            ok: true,
                            message,
                            error
                        })
                    break;
    }
    }
    module.exports = serveResp