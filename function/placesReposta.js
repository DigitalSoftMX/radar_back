const{ Place } = require("../function/place")
const{ Price } = require("../function/price")
const placeRepo = []
const placePrice = []
const placeCREE = [
"PL/8492/EXP/ES/2015","PL/8490/EXP/ES/2015",
"PL/8493/EXP/ES/2015","PL/3477/EXP/ES/2015",
"PL/10070/EXP/ES/2015","PL/5468/EXP/ES/2015",
"PL/5795/EXP/ES/2015","PL/12712/EXP/ES/2015",
"PL/5785/EXP/ES/2015","PL/5797/EXP/ES/2015",
"PL/2482/EXP/ES/2015","PL/8597/EXP/ES/2015",
"PL/7174/EXP/ES/2015","PL/8228/EXP/ES/2015",
"PL/3354/EXP/ES/2015","PL/3220/EXP/ES/2015",
"PL/3471/EXP/ES/2015","PL/7422/EXP/ES/2015",
"PL/6041/EXP/ES/2015","PL/3479/EXP/ES/2015",
"PL/7516/EXP/ES/2015","PL/12043/EXP/ES/2015",
"PL/21879/EXP/ES/2018","PL/9483/EXP/ES/2015",
"PL/3231/EXP/ES/2015","PL/19303/EXP/ES/2016",
"PL/2065/EXP/ES/2015","PL/7774/EXP/ES/2015",
"PL/6612/EXP/ES/2015","PL/9972/EXP/ES/2015",
"PL/7643/EXP/ES/2015","PL/12712/EXP/ES/2015"
]
async function placesReposta() {
    placeArray  = await Place()
    priceArray  = await Price()
    for (let x = 0; x < placeCREE.length; x++) {
        for (let y = 0; y < placeArray.length; y++) {
            const element = placeArray[y]
            if (element?.cre_id == placeCREE[x]) {
                placeRepo.push({
                    'place_id' : element?.$?.place_id,
                    'name' :  element?.name,
                    'cre_id': element?.cre_id,
                })
            }
        }
    }
/*     for (let a = 0; a < placeRepo.length; a++) {
        for (let q = 0; q < priceArray.length; q++) {
            const element = priceArray[q]
            if (element?.cre_id == placeCREE[x]) {
                placeRepo.push({
                    'place_id' : element?.$?.place_id,
                    'name' :  element?.name,
                    'cre_id': element?.cre_id,
                })
            }
        }
    } */

    return placePrice
}
module.exports = { placesReposta } 
//350,000 7 min y medio
//900,000 15 min
//1,800,000 30 min
//3,600,000 1 hora
//86,400,000 1 dia