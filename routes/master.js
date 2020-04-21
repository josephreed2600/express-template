const nav = require('./nav.json');

// req.params holds things passed in by request

const index = (req, res) => {
	res.render('index', {
		title: 'Home: The really really really really really really really really really really really really really long page title for testing purposes',
		link: `/`,
		navlist: nav
	});
};

module.exports = {
	index
};
