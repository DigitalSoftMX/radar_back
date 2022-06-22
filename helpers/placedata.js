const{ placesReposta } = require("../function/placesReposta")
const Prices = require("../model/Prices");
const Station = require("../model/Station");
const station = require("./station")
const today = new Date();
var getToday = today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()

async function placesData() {
    try {        
        let dataJson = await placesReposta()
        varfinal = []
        station.forEach(async station => {
            const foundCree =  dataJson.find(element => element.cre_id == station)
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
                    const i = findStation[0].prices.length -1;
                    if (foundCree.price.regular != findStation[0].prices[i]?.regular ||  foundCree.price.premium != findStation[0].prices[i]?.premium || foundCree.price.diesel != findStation[0].prices[i]?.diesel ) {         
                        console.log('precios unicos') 
                        prices = {
                            prices: Object.assign({'regular':foundCree?.price?.regular, 'premium':foundCree?.price?.premium, 'diesel':foundCree?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                        }
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }else if(getToday != findStation[0].prices[i]?.date) {
                        console.log('fechas unicas') 
                        prices = {
                            prices: Object.assign({'regular':foundCree?.price?.regular, 'premium':foundCree?.price?.premium, 'diesel':foundCree?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                        }
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }
                    else {    
                        console.log('precios y fechas repetidos')                
                    } 
            }
        })
/*         stationscompetitions.forEach(async station => {
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
                    const i = findStation[0].prices.length -1;
                    if (foundCree.price.regular != findStation[0].prices[i]?.regular ||  foundCree.price.premium != findStation[0].prices[i]?.premium || foundCree.price.diesel != findStation[0].prices[i]?.diesel ) {         
                        console.log('precios unicos') 
                        prices = {
                            prices: Object.assign({'regular':foundCree?.price?.regular, 'premium':foundCree?.price?.premium, 'diesel':foundCree?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                        }
                        //console.log(prices);
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }else if(getToday != findStation[0].prices[i]?.date) {
                        console.log('fechas unicas') 
                        prices = {
                            prices: Object.assign({'regular':foundCree?.price?.regular, 'premium':foundCree?.price?.premium, 'diesel':foundCree?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                        }
                        //console.log(prices);
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }
                    else {    
                        console.log('precios y fechas repetidos')                
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
                    await Station.findOneAndUpdate({'CRE':foundStation.cre_id}, {$push: prices},{new:true})
                }  else {
                    let findStationCompe = await Prices.find({'stationId': stationCompFind2[0]._id})
                    console.log(findStationCompe);
                    const j = findStationCompe[0]?.prices.length - 1
                        if (foundStation?.price?.regular != findStationCompe[0]?.prices[j]?.regular || foundStation?.price?.premium != findStationCompe[0]?.prices[j]?.premium || foundStation?.price?.diesel != findStationCompe[0]?.prices[j]?.diesel) {
                            console.log('precios unicos'); 
                            prices = {
                                prices: Object.assign({'regular':foundStation?.price?.regular, 'premium':foundStation?.price?.premium, 'diesel':foundStation?.price?.diesel},{'date': today.getFullYear() + "-" + 
                                `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()},{'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                            }
                                await Prices.findOneAndUpdate({'stationId': stationCompFind2[0]._id},{$push:prices},{new:true})
                        } else if(getToday != findStationCompe[0]?.prices[j]?.date){
                            console.log('fechas unicos')
                            prices = {
                                prices: Object.assign({'regular':foundStation?.price?.regular, 'premium':foundStation?.price?.premium, 'diesel':foundStation?.price?.diesel},{'date': today.getFullYear() + "-" + 
                                `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()},{'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                            }
                              await Prices.findOneAndUpdate({'stationId': stationCompFind2[0]._id},{$push:prices},{new:true})
                        } else {
                           console.log('precios y fechas repetidos'); 
                        }
                }
            }) 
        }) */
        setInterval(placesData, 3600000)
        console.log('ARCHIVO DE LA CRE EJECUTADO');
        //setInterval(placesData, 60000)
        return dataJson
    } catch (error) {
        console.log(error);
    }
}

module.exports = { placesData } 