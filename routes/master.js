const logger = require(process.env.FEW_LIBS?'../logger':'logger').get('master');
const { makeSearchable } = require('../util');


let nav = makeSearchable(require('./nav.json'), 'pages');
//let catalog = makeSearchable(require('../db/catalog.json'), 'products');


const index = (req, res) => {
	let page_details = nav.get('index');
	res.render('index', {
		navlist: nav.pages,
		title: page_details.page_name,
		slug: page_details.page_id,
	});
};


const routes = [
	{
		uri: '/',
		methods: ['get'],
		handler: index
	}
]


const apply = (app) => {
	routes.forEach((route) => {
		route.methods.forEach((method) => {
			app[method](route.uri, route.handler);
			logger.info(`Adding route: ${method.toLocaleUpperCase()} ${route.uri}`);
		});
	});
};


module.exports = { apply };
