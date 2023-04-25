'use strict'
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const conteudosRoutes = require('./routes/conteudoRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', conteudosRoutes.routes);

app.listen(config.port, () => console.log('server is listening on https://localhost:' + config.port))