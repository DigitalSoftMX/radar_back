function rangeDates(array, range) {
    dateArray = []
    for (let i = 0; i < range.length; i++) {
        for (let z = 0; z < array.length; z++) {
            console.log(range[i], array[z].date);
            if(range[i] == array[z].date){
                dateArray.push(array[z])
            } else {
                console.log('fechas diferentes');
            }

        }
        
    }
    return dateArray
}
module.exports = rangeDates