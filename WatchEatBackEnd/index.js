'use strict'
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', require('./routes/conteudoRoutes').routes);
app.use('/api', require('./routes/utlizadorRoutes').routes);
app.use('/api', require('./routes/produtoRoutes').routes);
app.use('/api', require('./routes/menuRoutes').routes);
app.use('/api', require('./routes/estafetaRoutes').routes);

app.listen(config.port, () => console.log('server is listening on https://localhost:' + config.port))