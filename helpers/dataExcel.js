const Prices = require("../model/Prices");
const Station = require("../model/Station");
const stationscompetitions = require("./stationscompetitions")
const station = require("../helpers/station")
let dataPrice = []
let temp = []
async function datatoprintExcel() {
    dataPrice = []
    try {
        for (let x = 0; x < station.length; x++) {
            const element = station[x]
            let stationFind = await Station.find({'CRE':element})
            .populate({
                path:'prices',
                select: {'_id': 0, 'createdAt': 0, 'updatedAt': 0, 'stationId':0} 
            })
            .select(['-_id', '-competitor', '-createdAt', '-updatedAt'])
            dataPrice.push(stationFind[0])
        }
/*         for (let x = 0; x < stationscompetitions.length; x++) {
            const element = stationscompetitions[x];
            let stationFind = await Station.find({'CRE':element.cre_id})
            .populate({
                path:'prices',
                select: {'_id': 0, 'createdAt': 0, 'updatedAt': 0, 'stationId':0} 
            })
            .select(['-_id', '-competitor', '-createdAt', '-updatedAt'])
            temp = []
            for (let i = 0; i < element.competitions.length; i++) {
                const cometitions = element.competitions[i];
                let stationFindCompe = await Station.find({'CRE':cometitions})
                .populate({
                    path:'prices',
                    select: {'_id': 0, 'createdAt': 0, 'updatedAt': 0},
                    populate:{path:'stationId', select: {'_id': 0, 'createdAt': 0, 'updatedAt': 0,'prices':0,'competitor':0} },
                })
                .select(['-_id', '-competitor', '-createdAt', '-updatedAt'])
                temp.push({'stationName':stationFindCompe[0].companyName,'CRE':stationFindCompe[0].CRE,'prices':stationFindCompe[0].prices[0].prices})
            };
            dataPrice.push({'stationName':stationFind[0]?.companyName,'CRE':stationFind[0]?.CRE,'prices':stationFind[0]?.prices[0]?.prices[0] ,'competions':temp })
        } */
        return dataPrice
    } catch (error) {
        console.log(error);
    }  
}

module.exports = { datatoprintExcel }  