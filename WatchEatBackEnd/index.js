'use strict'
const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const authCookie = require("./middleware/authCookieVerify");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../WatchEat/src/app/pagina-inicial/pagina-inicial.component.html"));
});
app.get('/pagina-inicial', (req, res) => {
    res.sendFile(path.join(__dirname,"../WatchEat/src/app/pagina-inicial/pagina-inicial.component.html"));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,"../WatchEat/src/app/login/login.component.html"));
});

app.use('/api', require('./routes/conteudoRoutes').routes);
app.use('/api', require('./routes/utlizadorRoutes').routes);
app.use('/api', require('./routes/produtoRoutes').routes);
app.use('/api', require('./routes/menuRoutes').routes);
app.use('/api', require('./routes/estafetaRoutes').routes);
app.use('/api', require('./routes/bibliotecaRoutes').routes);
app.use('/api', require('./routes/atorRoutes').routes);
app.use('/api', require('./routes/authRoutes').routes);


app.listen(config.port, () => console.log('server is listening on https://localhost:' + config.port));