const{ placesReposta } = require("../function/placesReposta")
const Prices = require("../model/Prices");
const Station = require("../model/Station");
<<<<<<< HEAD
const today = new Date();
var getToday = today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()
const fs =require('fs')

=======
const station = require("./station")
const today = new Date();
var getToday = today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + `${(today.getDate()+1)}`.padStart(2,'0')
>>>>>>> 009c9878cc2849b5bf99645a3b8ff1dc5f2bfe95

async function placesData() {
    try {        
        let dataJson = await placesReposta()
<<<<<<< HEAD
/*          for (let i = 0; i < dataJson.length; i++) {
            const station = dataJson[i];
            let stationFind = await Station.find({'CRE':station?.cre_id})       
             if (stationFind.length == 0) {
               stations = new Station({
                   'companyName':station.name,
                   'CRE': station.cre_id,
               })
               idStation = await stations.save()
               priceStation = new Prices({
                    'prices':[{
                        'regular':station.price?.regular,
                        'premium':station.price?.premium, 
                        'diesel':station.price?.diesel,
                        'date': today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') + "-" + today.getDate(),
=======
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
                        'date': today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') + "-" + `${(today.getDate()+1)}`.padStart(2,'0'),
>>>>>>> 009c9878cc2849b5bf99645a3b8ff1dc5f2bfe95
                        'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds(),
                    }],
                        'stationId': idStation._id
                })
                priceStation2 = await priceStation.save()
                prices = {prices: priceStation2._id}
<<<<<<< HEAD
                let x = await Station.findOneAndUpdate({'CRE':station?.cre_id}, {$push: prices},{new:true})
            } else {
                let findStation = await Prices.find({'stationId': stationFind[0]._id})
                    const i = findStation[0].prices.length -1;
                    if (station.price.regular != findStation[0].prices[i]?.regular ||  station.price.premium != findStation[0].prices[i]?.premium || station.price.diesel != findStation[0].prices[i]?.diesel ) {         
                        //console.log('precios unicos') 
                        prices = {
                            prices: Object.assign({'regular':station?.price?.regular, 'premium':station?.price?.premium, 'diesel':station?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                        }
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }else if(getToday != findStation[0].prices[i]?.date) {
                        //console.log('fechas unicas') 
                        prices = {
                            prices: Object.assign({'regular':station?.price?.regular, 'premium':station?.price?.premium, 'diesel':station?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                        }
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }
                    else {    
                        //console.log('precios y fechas repetidos')                
                    } 
            } 
        } */
/*           dataJson.forEach(async station => {
            let stationFind = await Station.find({'CRE':station?.cre_id})   
            console.log(stationFind.length)       
             if (stationFind.length == 0) {
               stations = new Station({
                   'companyName':station.name,
                   'CRE': station.cre_id,
               })
               idStation = await stations.save()
               priceStation = new Prices({
                    'prices':[{
                        'regular':station.price?.regular,
                        'premium':station.price?.premium, 
                        'diesel':station.price?.diesel,
                        'date': today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') + "-" + today.getDate(),
                        'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds(),
                    }],
                        'stationId': idStation._id
                })
                priceStation2 = await priceStation.save()
                console.log(priceStation2);
                prices = {prices: priceStation2._id}
                let x = await Station.findOneAndUpdate({'CRE':station?.cre_id}, {$push: prices},{new:true})
            } else {
                let findStation = await Prices.find({'stationId': stationFind[0]._id})
                    const i = findStation[0].prices.length -1;
                    if (station.price.regular != findStation[0].prices[i]?.regular ||  station.price.premium != findStation[0].prices[i]?.premium || station.price.diesel != findStation[0].prices[i]?.diesel ) {         
                        console.log('precios unicos') 
                        prices = {
                            prices: Object.assign({'regular':station?.price?.regular, 'premium':station?.price?.premium, 'diesel':station?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
=======
                let x = await Station.findOneAndUpdate({'CRE':foundCree.cre_id}, {$push: prices},{new:true})
            } else {
                let findStation = await Prices.find({'stationId': stationFind[0]._id})
                    const i = findStation[0].prices.length -1;
                    if (foundCree.price.regular != findStation[0].prices[i]?.regular ||  foundCree.price.premium != findStation[0].prices[i]?.premium || foundCree.price.diesel != findStation[0].prices[i]?.diesel ) {         
                        console.log('precios unicos') 
                        prices = {
                            prices: Object.assign({'regular':foundCree?.price?.regular, 'premium':foundCree?.price?.premium, 'diesel':foundCree?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + `${(today.getDate()+1)}`.padStart(2,'0'),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
>>>>>>> 009c9878cc2849b5bf99645a3b8ff1dc5f2bfe95
                        }
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }else if(getToday != findStation[0].prices[i]?.date) {
                        console.log('fechas unicas') 
                        prices = {
<<<<<<< HEAD
                            prices: Object.assign({'regular':station?.price?.regular, 'premium':station?.price?.premium, 'diesel':station?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
=======
                            prices: Object.assign({'regular':foundCree?.price?.regular, 'premium':foundCree?.price?.premium, 'diesel':foundCree?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + `${(today.getDate()+1)}`.padStart(2,'0'),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
>>>>>>> 009c9878cc2849b5bf99645a3b8ff1dc5f2bfe95
                        }
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }
                    else {    
                        console.log('precios y fechas repetidos')                
                    } 
<<<<<<< HEAD
            } 
        })  */   
=======
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
>>>>>>> 009c9878cc2849b5bf99645a3b8ff1dc5f2bfe95
        setInterval(placesData, 3600000)
        console.log('ARCHIVO DE LA CRE EJECUTADO');
        //setInterval(placesData, 60000)
        return dataJson
    } catch (error) {
        console.log(error);
    }
}

module.exports = { placesData } 