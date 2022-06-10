const{ Place } = require("../function/place")
const{ Price } = require("../function/price")
let placeRepo = []
let placePrice = []
let priceRepo = []

async function reductionJson(arrayStation) {
    placePrice = []
    placeRepo = []
    priceRepo = []
    placeArray  = await Place()
    priceArray  = await Price()

    usersById = priceArray.reduce((acc, priceArray) => {
        if (!acc[priceArray?.$?.place_id]) {
      acc[priceArray?.$?.place_id] = []
        }
      
        acc[priceArray?.$?.place_id].push(priceArray)
      
        return acc
      }, {})
      for (const [key, value] of Object.entries(usersById)) {
        x = []
        for (let i = 0; i < value.length; i++) {
            const element = value[i];
            element?.gas_price.forEach(element => {
                x.push(element)
            })
        }
        priceRepo.push({
            'place_id' : key,
            'price' :  x,
        })
    }

    for (let x = 0; x < arrayStation.length; x++) {
        for (let y = 0; y < placeArray.length; y++) {
            const element = placeArray[y]
            if (element?.cre_id == arrayStation[x] ) {
                placeRepo.push({
                    'place_id' : element?.$?.place_id,
                    'name' :  element?.name[0],
                    'cre_id': element?.cre_id[0]
                })
            }
        }
        
    }
    for (let i = 0; i < placeRepo.length; i++) {
        for (let z = 0; z < priceRepo.length; z++) {
            const element = priceRepo[z]
            let regular, diesel, premium
            if (element?.place_id == placeRepo[i]?.place_id) {
                for (let b = 0; b < element.price.length; b++) {
                    const ele = element.price[b]
                    if (ele?.$?.type == 'regular') {
                        regular = ele?._
                    }else if (ele?.$?.type == 'premium') {
                        premium = ele?._
                    } else {
                        diesel = ele?._
                    }
                }
                placePrice.push({
                    'cre_id' : placeRepo[i]?.cre_id,
                    'name' : placeRepo[i]?.name,
                    'price' : {'regular':regular,'premium': premium,'diesel':diesel}

                })
            }
        }
        
    }
    return placePrice
    
}
module.exports = { reductionJson } 