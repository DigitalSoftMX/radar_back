module.exports = io => {
    io.on('connection', ( client ) => {
        console.log(client);
        client.on('position-change',(data)=>{+
            io.emit('position-change', data)
        })
        client.on('disconnect',() => {

        })
    });
}