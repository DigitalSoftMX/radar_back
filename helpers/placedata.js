const{ placesReposta } = require("../function/placesReposta")
const Prices = require("../model/Prices")
const StationCompetitor = require("../model/StationCompetitor")
const placeCREE = [
    "PL/8492/EXP/ES/2015","PL/8490/EXP/ES/2015","PL/8493/EXP/ES/2015",
    "PL/3477/EXP/ES/2015","PL/10070/EXP/ES/2015","PL/5468/EXP/ES/2015",
    "PL/5795/EXP/ES/2015","PL/12712/EXP/ES/2015","PL/5785/EXP/ES/2015",
    "PL/5797/EXP/ES/2015","PL/2482/EXP/ES/2015","PL/8597/EXP/ES/2015",
    "PL/7174/EXP/ES/2015","PL/8228/EXP/ES/2015","PL/3354/EXP/ES/2015",
    "PL/3220/EXP/ES/2015","PL/3471/EXP/ES/2015","PL/7422/EXP/ES/2015",
    "PL/6041/EXP/ES/2015","PL/3479/EXP/ES/2015","PL/7516/EXP/ES/2015",
    "PL/12043/EXP/ES/2015","PL/21879/EXP/ES/2018","PL/9483/EXP/ES/2015",
    "PL/3231/EXP/ES/2015","PL/19303/EXP/ES/2016","PL/2065/EXP/ES/2015",
    "PL/7774/EXP/ES/2015","PL/6612/EXP/ES/2015","PL/9972/EXP/ES/2015",
    "PL/7643/EXP/ES/2015","PL/23232/EXP/ES/2015","PL/23233/EXP/ES/2015",
    "PL/23234/EXP/ES/2015","PL/23235/EXP/ES/2015","PL/22857/EXP/ES/2015"]

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

async function placesData() {
    let z = []
    let dataJson = await placesReposta()
    varfinal = []

    for (let i = 0; i < dataJson.length; i++) {
        const element = dataJson[i]
        let stationFind = await StationCompetitor.find({CRE:element.cre_id[0]})
        if (stationFind.length != 0) {
            if (element?.regular!= undefined || element?.diesel != undefined || element?.premium != undefined) {
                pivo = { prices : {
                    'regular' :  element?.regular,
                    'diesel' : element?.diesel,
                    'premium' : element?.premium,
                    'date': today.toLocaleTimeString()}
                }
            } 
            console.log(pivo);
            let z = await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:pivo})
        }else { 
            stations = new StationCompetitor({     
                'CRE': element?.cre_id[0],
                'companyName': element?.name[0]
            })
            infoStation = await stations.save()
            priceStation = new Prices({
                'prices':[{'regular':element?.regular,'diesel':element?.diesel,'premium':element?.premium, 'date': today.toISOString()}],
                'stationId': infoStation._id
            })
            varfinal.push(infoStation)
            priceStation2 = await priceStation.save()
            prices = {prices: priceStation2._id}
            await StationCompetitor.findByIdAndUpdate(infoStation._id, {$push: prices}) 
        } 
    }  
    setInterval(placesData, 28800000)
    return varfinal
}

module.exports = { placesData } 