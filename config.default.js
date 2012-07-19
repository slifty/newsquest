var config = {}

config.mongo = {};
config.mongo.base = 'mongodb://localhost/db';
config.mongo.host = 'hostname';
config.mongo.port = 6379;

config.web = {};
config.web.port = process.env.WEB_PORT || 3000;

config.api = {};
config.api.daylife = {};
config.api.daylife.accesskey = '';
config.api.daylife.secret = '';

config.api.extraction = {};
config.api.extraction.host = 'newsquest.me';
config.api.extraction.path = '/NYOA/api/article/info';

config.api.questions = {};
config.api.questions.host = 'newsquest.me';
config.api.questions.path = '/NYOA/api/QuestionGeneration/questions';

config.api.related = {}
config.api.related.host = 'newsquest.me';
config.api.related.path = '/NYOA/api/QuestionGeneration/questions';

module.exports = config;