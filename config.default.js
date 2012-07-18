var config = {}

config.mongo = {};
config.mongo.base = 'mongodb://localhost/db';
config.mongo.host = 'hostname';
config.mongo.port = 6379;

config.web = {};
config.web.port = process.env.WEB_PORT || 3000;

config.api = {};
config.api.extraction = {};
config.api.extraction.host = '';
config.api.extraction.path = '';
config.api.questions = {};
config.api.questions.host = '';
config.api.questions.path = '';

module.exports = config;