const{ placesReposta } = require("../function/placesReposta")
const Prices = require("../model/Prices")
const StationCompetitor = require("../model/StationCompetitor")

async function placesData() {
    let dataJson = await placesReposta()
    varfinal = []
    for (let i = 0; i < dataJson.length; i++) {
        const element = dataJson[i]
        pivo = {
            'regular' : element?.regular,
            'diesel' : element?.diesel,
            'premium' : element?.premium,
            
        }
        let stationFind = await StationCompetitor.find({CRE:element.cre_id[0]})
        console.log('cre id: ',element.cre_id[0]);
        console.log('stationFind',stationFind);
        if (stationFind.length != 0) {
            let z = await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{price:{$push:pivo}})
            console.log('updateprice',z);
        }else { 
            stations = new StationCompetitor({     
                'CRE': element?.cre_id[0],
                'companyName': element?.name[0]
            })
            infoStation = await stations.save()
            priceStation = new Prices({
                'prices':[{'regular':element?.regular,'diesel':element?.diesel,'premium':element?.premium}  ],
                'stationId': infoStation._id
            })
            varfinal.push(infoStation)
            priceStation2 = await priceStation.save()
            console.log('unico',priceStation2);
            prices = {prices: priceStation2._id}
            await StationCompetitor.findByIdAndUpdate(infoStation._id, {$push: prices}) 
        } 
    }
    //setInterval(placesData, 100)
    return varfinal
}

module.exports = { placesData } 