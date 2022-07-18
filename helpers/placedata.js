const{ placesReposta } = require("../function/placesReposta")
const Prices = require("../model/Prices");
const Station = require("../model/Station");
const today = new Date();
var getToday = today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()
const fs =require('fs')


async function placesData() {
    try {        
        let dataJson = await placesReposta()
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
                        'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds(),
                    }],
                        'stationId': idStation._id
                })
                priceStation2 = await priceStation.save()
                prices = {prices: priceStation2._id}
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
                        }
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }else if(getToday != findStation[0].prices[i]?.date) {
                        console.log('fechas unicas') 
                        prices = {
                            prices: Object.assign({'regular':station?.price?.regular, 'premium':station?.price?.premium, 'diesel':station?.price?.diesel},{'date': today.getFullYear() + "-" + 
                            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
                        }
                            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
                    }
                    else {    
                        console.log('precios y fechas repetidos')                
                    } 
            } 
        })  */   
        setInterval(placesData, 3600000)
        console.log('ARCHIVO DE LA CRE EJECUTADO');
        //setInterval(placesData, 60000)
        return dataJson
    } catch (error) {
        console.log(error);
    }
}

module.exports = { placesData } 