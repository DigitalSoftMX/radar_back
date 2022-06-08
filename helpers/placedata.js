const{ placesReposta } = require("../function/placesReposta")
const Prices = require("../model/Prices")
const StationCompetitor = require("../model/StationCompetitor")

async function placesData() {
    let dataJson = await placesReposta()
    for (let i = 0; i < dataJson.length; i++) {
        const element = dataJson[i]
        console.log(element);
        let pivo = {}
        let stationFind = await StationCompetitor.find({CRE:element.cre_id[0]})
            pivo = {
                'regular' : element?.regular,
                'diesel' : element?.diesel,
                'premium' : element?.premium,

            }
        if (stationFind.length != 0) {
            Prices.findOneAndUpdate({stationId: stationFind._id},{$push:pivo})
        }else {
            console.log('entro aqui');
            stations = new StationCompetitor({     
                'CRE': element?.cre_id[0],
                'companyName': element?.name[0]
            })
            infoStation = await stations.save()
            priceStation = new Prices({
                'prices':[{'regular':element?.regular,'diesel':element?.diesel,'premium':element?.premium}  ],
                'stationId': infoStation._id
            })
            priceStation2 = await priceStation.save()
            prices = {prices: priceStation2._id}
            await StationCompetitor.findByIdAndUpdate(infoStation._id, {$push: prices}) 
        } 
    }
    //setInterval(placesData, 100)
    return dataJson
}

module.exports = { placesData } 