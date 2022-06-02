//==============================================================================================
//*            LIBS
//===============================================================================================

const Facturapi = require('facturapi')
const { TAXAPI } = require('../config/config')
const facturapi = new Facturapi(TAXAPI)

//*===============================================================================================
//*            NEW CUSTOMER
//*===============================================================================================

exports.newCostumer = async function(req, res) {
    const body = req.body
    if (Object.entries(body).length === 0) {
        error = { error: 'sin data '}
        serveResp(null,error,'No se encontro ningún contenido',406,res)
    } else {
        console.log(body);
            try {
                const newcostumer = await facturapi.customers.create({
                    legal_name : body.legal_name,
                    tax_id : body.tax_id,
                    tax_system : body.tax_system,
                    address : body.address,
                    email : body.email,
                    phone : body.phone
                })
                console.log(newcostumer);
            } catch (error) {
                console.log(error);
            }
        }
}

//*===============================================================================================
//*            SERVICES AND PRODUCTS
//*===============================================================================================

exports.servicesAndproduct = async function(req, res) {
    const body = req.body
    if (Object.entries(body).length === 0) {
        error = { error: 'sin data '}
        serveResp(null,error,'No se encontro ningún contenido',406,res)
    } else {
        console.log(body);
            try {
                const searchResult = await facturapi.catalogs.searchProducts({
                    q: 'gasolina'
                  });
                console.log(searchResult);
            } catch (error) {
                console.log(error);
            }
        }
}


//*===============================================================================================
//*            NEW ORGANIZATION
//*===============================================================================================

exports.newOrganization = async function(req, res) {
    const body = req.body
    if (Object.entries(body).length === 0) {
        error = { error: 'sin data '}
        serveResp(null,error,'No se encontro ningún contenido',406,res)
    } else {
        console.log(body);
            try {
                const organization = await facturapi.organizations.create({
                    name: 'GASOLINERIA ELE, S.A. DE C.V.'
                  });
                console.log(organization);
            } catch (error) {
                console.log(error);
            }
        }
}




