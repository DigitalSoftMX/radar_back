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
        return dataPrice
    } catch (error) {
        console.log(error);
    }  
}

module.exports = { datatoprintExcel }  