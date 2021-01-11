const { mock } = require('pactum');

require('./environment.mock');
require('./projects.mock');
require('./search.mock');
require('./metrics.mock');

mock.addInteraction('get environments');
mock.addInteraction('get projects');
mock.addInteraction('search analyses');
mock.addInteraction('get analyses metrics');

mock.start(3000);