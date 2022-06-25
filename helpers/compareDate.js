function compareDate(array, dateActually) {
    dateArray = []
    array.forEach(element => {
        if (element.date == dateActually) {
            dateArray.push(element)
        } 
/*         else {
            console.log('fechas diferentes');
        } */
    })
    return dateArray
}
module.exports = compareDate