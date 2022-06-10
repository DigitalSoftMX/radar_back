const{ placesReposta } = require("../function/placesReposta")
const Prices = require("../model/Prices");
const Station = require("../model/Station");
//const StationCompetitor = require("../model/StationCompetitor")
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const stationscompetitions =
    [{
        'cre_id' : 'PL/22857/EXP/ES/2019', 
        'competitions' : ['PL/9483/EXP/ES/2015','PL/3231/EXP/ES/2015',
        'PL/19303/EXP/ES/2016','PL/2065/EXP/ES/2015',
        'PL/7774/EXP/ES/2015','PL/6612/EXP/ES/2015',
        'PL/9972/EXP/ES/2015','PL/7643/EXP/ES/2015',
        'PL/12712/EXP/ES/2015']
    },
    {
        'cre_id': 'PL/23234/EXP/ES/2020',
        'competitions':['PL/5795/EXP/ES/2015','PL/12712/EXP/ES/2015',
            'PL/5785/EXP/ES/2015','PL/5797/EXP/ES/2015'
        ]
    },{
        'cre_id': 'PL/23233/EXP/ES/2020',
        'competitions':[
        'PL/2482/EXP/ES/2015','PL/8597/EXP/ES/2015',
        'PL/7174/EXP/ES/2015','PL/8228/EXP/ES/2015'
        ]
    },{
        'cre_id':'PL/23235/EXP/ES/2020',
        'competitions': [
        'PL/8492/EXP/ES/2015','PL/8490/EXP/ES/2015',
        'PL/8493/EXP/ES/2015','PL/3477/EXP/ES/2015',
        'PL/10070/EXP/ES/2015','PL/5468/EXP/ES/2015'
        ]
    },{
        'cre_id':'PL/23232/EXP/ES/2020',
        'competitions': [
            'PL/3354/EXP/ES/2015','PL/3220/EXP/ES/2015',
            'PL/3471/EXP/ES/2015','PL/7422/EXP/ES/2015',
            'PL/6041/EXP/ES/2015','PL/3479/EXP/ES/2015',
            'PL/7516/EXP/ES/2015','PL/12043/EXP/ES/2015',
            'PL/21879/EXP/ES/2018'
            ]
    }]

async function placesData() {
    try {        
        let dataJson = await placesReposta()
        varfinal = []
        stationscompetitions.forEach(async station => {
            const foundCree =  dataJson.find(element => element.cre_id == station.cre_id)
            let stationFind = await Station.find({'CRE':foundCree.cre_id})
            console.log(foundCree.cre_id);
            if (stationFind.length == 0) {
               stations = new Station({
                   'companyName':foundCree.name,
                   'CRE': foundCree.cre_id,
               })
               idStation = await stations.save()
                priceStation = new Prices({
                    'prices':[{'regular':foundCree?.price?.regular,'diesel':foundCree?.price?.diesel,'premium':foundCree?.price?.premium, 'date': today.toLocaleString()}],
                    'stationId': idStation._id
                })
                priceStation2 = await priceStation.save()
                prices = {prices: priceStation2._id}
                let x = await Station.findOneAndUpdate({'CRE':foundCree.cre_id}, {$push: prices},{new:true})
            } else {
                prices = {prices: Object.assign(foundCree.price,{'date':today.toLocaleString()}) }
                let z = await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
            }
    
            station.competitions.forEach(async stationCompe => {
                const foundStation =  dataJson.find(element => element.cre_id == stationCompe)
                let stationCompFind2 = await Station.find({'CRE':foundStation.cre_id})
                console.log(foundStation.cre_id);
                if (stationCompFind2.length == 0) {
                   stationsCompetitors = new Station({
                       'companyName':foundStation.name, 
                       'CRE': foundStation.cre_id,
                       'competitor':true
                   })
                   idStationCompetitors = await stationsCompetitors.save()
                   priceStation = new Prices({
                       'prices':[{'regular':foundStation?.price?.regular,'diesel':foundStation?.price?.diesel,'premium':foundStation?.price?.premium, 'date': today.toLocaleString()}],
                       'stationId': idStationCompetitors._id
                    })
                    priceStation2 = await priceStation.save()
                    prices = {prices: priceStation2._id}
                    let x = await Station.findOneAndUpdate({'CRE':foundStation.cre_id}, {$push: prices},{new:true})
                }  else {
                    prices = {prices: Object.assign(foundStation.price,{'date':today.toLocaleString()}) }
                    let z = await Prices.findOneAndUpdate({'stationId': stationCompFind2[0]._id},{$push:prices},{new:true})
                }
            })
        })
        setInterval(placesData, 28800000)
        return dataJson
    } catch (error) {
        console.log(error);
    }
}

module.exports = { placesData } 