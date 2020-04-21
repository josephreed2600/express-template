#!/usr/bin/node
process.env.NODE_ENV = 'debug'; // switch between debug and production to toggle some debugging output
process.env.FEW_LIBS = true;
const package = require('./package.json');

console.log(`Starting ${package.name} v${package.version}`);

// school says don't use additional packages
if(process.env.FEW_LIBS) {
	process.env.PORT = 3000;
} else {
	require('dotenv').configure();
}
const logger = require(process.env.FEW_LIBS?'./logger':'logger').get('main');

logger.info('Requiring packages...');
const express = require('express');
const routes = require('./routes/master');
const path = require('path');
const app = express();
logger.info('Required packages.');

logger.info('Configuring Express...');
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
logger.info('Configured Express.');

logger.info('Configuring routes...');
app.get('/', routes.index);
//app.get('/wiki/:name', routes.wiki);
logger.info('Configured routes.');

logger.info(`Listening on port ${process.env.PORT}`);
app.listen(process.env.PORT);
