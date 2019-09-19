const express = require ('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

//helpers con algunas funciones
const helpers = require('./helpers');

//Crear la conexión a la bd
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

//crea la tabla proyectos
db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error))

//crear una app de express
const app = express();

//Donde cargar los archivos estáticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

//Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended : true}));

//Añadir la carpeta de las vistas
app.set('views',path.join(__dirname, './views'));

// Agregar flash messeges
app.use(flash());

app.use(cookieParser());

//sessiones nos permiten navegar entre distintas paginas sin volvernos a autentificar
app.use(session({
    secret:'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Pasar var dump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario= {...req.user} || null;
    next();
});

app.use('/', routes());

app.listen(3000); //en que puerto va correr
