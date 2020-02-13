let mongoose = require('mongoose');
let URL = process.env.URL || 'mongodb://localhost/APP_DB';

//Estableciendo la conecion
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//Modelo
let db = mongoose.connection;

//activamos el Listener
db.on('error', () => {
    console.log('Ocurrio un error con la conexion a la DB')
});

//activamos el Listener
db.on('open', () => {
    console.log('Conexion establecida exitosa.')
});