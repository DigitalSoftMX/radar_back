//===============================================================================================
//            LIBS
//===============================================================================================

const http = require('http'),
 express = require('express'),
 mongoose = require('mongoose'),
 bodyParser = require('body-parser')
//===============================================================================================
//            CONFIG
//===============================================================================================

const { PORT, URI } = require('./config/config')
const app = express()

//===============================================================================================
//            HEADER REQUESTS
//===============================================================================================

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true}));
app.use(bodyParser.json({limit: '50mb', parameterLimit: 100000, extended: true}));

//===============================================================================================
//            ROUTER
//===============================================================================================

app.use(require('./router/router'))
//===============================================================================================
//            DATABASE
//===============================================================================================
console.log(URI);
mongoose.connect(`${URI}`,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(msg => console.log("DB online"))
    .catch(error => console.log(error)) 

//===============================================================================================
//            SERVER
//===============================================================================================
 
let server = http.createServer(app)
const io = require('socket.io')(server)
app.set('socketio',io)
server.listen(PORT, (err) => {
    if (err) throw new Error(err)
})
console.log(`Server on port: ${PORT}`)