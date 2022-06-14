const{ placesReposta } = require("../function/placesReposta")
const Prices = require("../model/Prices");
const Station = require("../model/Station");
const stationscompetitions = require("./stationscompetitions");
//const StationCompetitor = require("../model/StationCompetitor")
//const timeElapsed = Date.now();
const today = new Date();
var getToday = today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()

async function placesData() {
    try {        
        let dataJson = await placesReposta()
        varfinal = []
        stationscompetitions.forEach(async station => {
            const foundCree =  dataJson.find(element => element.cre_id == station.cre_id)
            let stationFind = await Station.find({'CRE':foundCree.cre_id})
            if (stationFind.length == 0) {
               stations = new Station({
                   'companyName':foundCree.name,
                   'CRE': foundCree.cre_id,
               })
               idStation = await stations.save()
                priceStation = new Prices({
                    'prices':[{
                        'regular':foundCree?.price?.regular,
                        'premium':foundCree?.price?.premium, 
                        'diesel':foundCree?.price?.diesel,
                        'date': today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') + "-" + today.getDate(),
                        'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds(),
                    }],
                        'stationId': idStation._id
                })
                priceStation2 = await priceStation.save()
                prices = {prices: priceStation2._id}
                let x = await Station.findOneAndUpdate({'CRE':foundCree.cre_id}, {$push: prices},{new:true})
            } else {
                let findStation = await Prices.find({'stationId': stationFind[0]._id})
                for (let i = 0; i < findStation[0].prices.length; i++) {
                    const element = findStation[0].prices[i];
                    if ((foundCree.price.regular != element.regular ||  foundCree.price.premium != element.premium || foundCree.price.diesel != element.diesel) && getToday != element.date ) {         
                        prices = {
                            prices: Object.assign({'regular':foundCree?.price?.regular, 'premium':foundCree?.price?.premium, 'diesel':foundCree?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })}
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    } else {    
                        console.log('precios repetidos')                
                    } 
                }
            }   
            station.competitions.forEach(async stationCompe => {
                const foundStation =  dataJson.find(element => element.cre_id == stationCompe)
                let stationCompFind2 = await Station.find({'CRE':foundStation.cre_id})
                if (stationCompFind2.length == 0) {
                   stationsCompetitors = new Station({
                       'companyName':foundStation.name, 
                       'CRE': foundStation.cre_id,
                       'competitor':true
                   })
                   idStationCompetitors = await stationsCompetitors.save()
                   priceStation = new Prices({
                       'prices':[{
                        'regular':foundStation?.price?.regular,
                        'premium':foundStation?.price?.premium, 
                        'diesel':foundStation?.price?.diesel,
                        'date': today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') + "-" + today.getDate(),
                        'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds()
                        }],
                        'stationId': idStationCompetitors._id
                    })
                    priceStation2 = await priceStation.save()
                    prices = {prices: priceStation2._id}
                    let x = await Station.findOneAndUpdate({'CRE':foundStation.cre_id}, {$push: prices},{new:true})
                }  else {
                    let findStationCompe = await Prices.find({'stationId': stationCompFind2[0]._id})
                    for (let e = 0; e < findStationCompe[0]?.prices.length; e++) {
                        const element = findStationCompe[0]?.prices[e]
                        if ((foundStation?.price?.regular != element.regular || foundStation?.price?.premium != element.premium || foundStation?.price?.diesel != element.diesel) && getToday != element.date) {
                            prices = {
                                prices: Object.assign({'regular':foundStation?.price?.regular, 'premium':foundStation?.price?.premium, 'diesel':foundStation?.price?.diesel},{'date': today.getFullYear() + "-" + 
                                `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()},{'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })}
                                await Prices.findOneAndUpdate({'stationId': findStationCompe[0]._id},{$push:prices},{new:true})
                        } else {
                           console.log('precios repetidos'); 
                        }
                    }
                }
            }) 
        })
        //setInterval(placesData, 3600000)
        setInterval(placesData, 60000)
        return dataJson
    } catch (error) {
        console.log(error);
    }
}

module.exports = { placesData } 