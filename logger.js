/**
 * Usage:
 * var logger = require('logger').get('context_name')
 * logger.log('stuff') // yields a message prefixed with '[context_name]'
 */
exports.get = function(role, options = {}) {
	if(process.env.FEW_LIBS) {
		var logger_func = (type) => {
			return (content) => { console.log(`${type}:\t[ ${role} ] ${content}`); };
		};
		var logger = {
			info: logger_func('info'),
			warn: logger_func('warn'),
			error: logger_func('error'),
			debug: logger_func('debug')
		}
	} else {
		var defaults = {path: './logs/', level: 'debug'};
		//for(i in defaults) if(!o.hasOwnProperty(i)) o[i] = defaults[i];
		o = Object.assign(defaults, options);
		var winston = require('winston');
		var log_format = winston.format.printf(
			info => {info.message = '[' + role + '] ' + info.message; return info;}
		);
		var logger = winston.createLogger({
			level: o.level,
			format: winston.format.combine(
				log_format,
				winston.format.align()
			),
			transports: []
		});
		logger.add(new winston.transports.File({
			filename: o.path + role + '-error.log',
			level: 'error',
			format: winston.format.simple()
		}));
		logger.add(new winston.transports.File({
			filename: o.path + role + '-combined.log',
			format: winston.format.simple()
		}));
		if(process.env.NODE_ENV !== 'production') {
			logger.add(new winston.transports.Console({
				format: winston.format.simple()
			}));
		}
	}
	return logger;
};
