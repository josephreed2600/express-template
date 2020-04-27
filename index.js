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
const path = require('path');
const bodyParser = require('body-parser');
logger.info('Required packages.');

logger.info('Configuring Express...');
const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
logger.info('Configured Express.');

logger.info('Configuring routes...');
let routeFiles = ['master'];
routeFiles.forEach((file) => {
	logger.info(`Adding ${file} routes...`);
	require(`./routes/${file}`).apply(app);
});
logger.info('Configured routes.');

logger.info(`Listening on port ${process.env.PORT}`);
app.listen(process.env.PORT);
