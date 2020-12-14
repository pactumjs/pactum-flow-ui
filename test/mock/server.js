const { mock } = require('pactum');

require('./metrics.mock');
require('./projects.mock');
require('./analysis.mock');
require('./search.mock');

mock.addMockInteraction('get metrics');
mock.addMockInteraction('get project pid1');
mock.addMockInteraction('get analysis aid2');
mock.addMockInteraction('search flows');

mock.start(3000);