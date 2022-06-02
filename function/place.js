const{ xmlToJson } = require("./xmlToJson")

async function Place() {
    const urlPlaces =  'http://publicacionexterna.azurewebsites.net/publicaciones/places'
    let places = {}
    intervalFunc =  await xmlToJson(urlPlaces).then((data)=>{
        places = data['places']['place']
        //setTimeout(Place, 150);
        data['places']['place'].forEach(element => {
            if (element?.$?.place_id == '10557') {
                console.log('place_id', element?.$?.place_id)
                console.log('name', element?.name)
                console.log('cre_id', element?.cre_id)
                console.log(element?.location);
            }
        });
    })
    return places
}
module.exports = { Place } 