const Prices = require("../model/Prices");
const Station = require("../model/Station");
let dataPrice = []
let temp = []
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
async function datatoprintExcel() {
    dataPrice = []
    try {
        for (let x = 0; x < stationscompetitions.length; x++) {
            const element = stationscompetitions[x];
            let stationFind = await Station.find({'CRE':element.cre_id})
            .populate('prices', 'prices')
            .select(['-_id', '-competitor', '-createdAt', '-updatedAt'])
            temp = []
            for (let i = 0; i < element.competitions.length; i++) {
                const cometitions = element.competitions[i];
                let stationFindCompe = await Station.find({'CRE':cometitions})
                .populate('prices', 'prices')
                .select(['-_id', '-competitor', '-createdAt', '-updatedAt'])
                temp.push(stationFindCompe[0])
            };
            dataPrice.push({'station':stationFind, 'competions':temp })
        }
        return dataPrice
    } catch (error) {
        console.log(error);
    }
}

module.exports = { datatoprintExcel }  