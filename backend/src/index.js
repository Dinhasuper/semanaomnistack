const express = require('express'); // importa as funcionalidades do express module
const cors = require('cors');
const routes = require('./routes'); // importa o código do arquivo routes
const app = express(); // criar a aplicação 

app.use(cors());//modulo de segurança
app.use(express.json());//informa a utilização de json no corpo das requisições
app.use(routes);



app.listen(3333);// vai ouvir a porta 3333