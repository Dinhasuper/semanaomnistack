
const express = require('express'); // importa as funcionalidades do express module

const OngController = require('./controllers/OngController');
const IncidentsControllers = require('./controllers/IncidentsControllers');
const ProfileControllers = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const connection = require('./database/connections');// conexão com o banco

const routes = express.Router();

//login
routes.post('/sessions',SessionController.create);


routes.get('/ongs',OngController.index)
routes.post('/ongs',OngController.create);

routes.get('/incidents',IncidentsControllers.index);
routes.post('/incidents',IncidentsControllers.create);

routes.delete('/incidents/:id',IncidentsControllers.delete);

routes.get('/profile',ProfileControllers.index);

module.exports = routes; // exportar uma variável