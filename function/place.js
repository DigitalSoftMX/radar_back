const{ xmlToJson } = require("./xmlToJson")

async function Place() {
    const urlPlaces =  'http://publicacionexterna.azurewebsites.net/publicaciones/places'
    let places = {}
    intervalFunc =  await xmlToJson(urlPlaces).then((data)=>{
        places = data['places']['place']
        //setTimeout(Place, 900)
    })
    return places
}
module.exports = { Place  } 