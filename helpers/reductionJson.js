const{ Place } = require("../function/place")
const{ Price } = require("../function/price")
const Prices = require("../model/Prices");
const Station = require("../model/Station")
const today = new Date()
const getToday = today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate()

let placeRepo = []
let placePrice = []
let priceRepo = []

async function reductionJson() {
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
        for (let y = 0; y < placeArray.length; y++) {
            const element = placeArray[y]
           
           if (element?.location[0]?.x[0] != 0 && element?.location[0]?.y[0] != 0) {      
               placeRepo.push({
                   'place_id' : element?.$?.place_id,
                   'name' :  element?.name[0],
                   'cre_id': element?.cre_id[0],
                   'location_x':element?.location[0]?.x[0], 
                   'location_y':element?.location[0]?.y[0]
               })
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
                let stationFind = await Station.find({'CRE':placeRepo[i]?.cre_id}) 
if (stationFind.length == 0) {
    stations = new Station({
        'companyName':placeRepo[i]?.name,
        'CRE': placeRepo[i]?.cre_id,
    })
    idStation = await stations.save()
    priceStation = new Prices({
         'prices':[{
             'regular':regular,
             'premium':premium, 
             'diesel':diesel,
             'date': today.getFullYear() + "-" + `${(today.getMonth()+1)}`.padStart(2,'0') + "-" + today.getDate(),
             'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds()+':'+today,
         }],
             'stationId': idStation._id
     })
     priceStation2 = await priceStation.save()
     prices = {prices: priceStation2._id}
     let x = await Station.findOneAndUpdate({'CRE':placeRepo[i]?.cre_id}, {$push: prices},{new:true})
} else {
    let findStation = await Prices.find({'stationId': stationFind[0]._id})
    const s = findStation[0].prices.length - 1;
    if (regular != findStation[0].prices[s]?.regular || premium != findStation[0].prices[s]?.premium || diesel != findStation[0].prices[s]?.diesel ) {         
        console.log('precios unicos') 
        prices = {
            prices: Object.assign({'regular':regular, 'premium':premium, 'diesel':diesel},{'date': today.getFullYear() + "-" + 
            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
        }
            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
    }else if(getToday != findStation[0].prices[s]?.date) {
        console.log('fechas unicas') 
        prices = {
            prices: Object.assign({'regular':regular, 'premium':premium, 'diesel':diesel},{'date': today.getFullYear() + "-" + 
            `${(today.getMonth()+1)}`.padStart(2,'0') +"-" + today.getDate(),'time': today.getHours()+":"+today.getMinutes()+':'+today.getSeconds() })
        }
            await Prices.findOneAndUpdate({'stationId': stationFind[0]._id},{$push:prices},{new:true})
    }
    else {    
        console.log('precios y fechas repetidos')                
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