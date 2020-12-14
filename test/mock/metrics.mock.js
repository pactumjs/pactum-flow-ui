const { addMockInteractionHandler } = require('pactum').handler;

addMockInteractionHandler('get metrics', () => {
  return {
    withRequest: {
      method: 'GET',
      path: '/api/flow/v1/metrics/projects'
    },
    willRespondWith: {
      status: 200,
      body: [
        {
          _id: 'pid1',
          name: '[AVG] project-mars',
          flows: 3,
          consumers: 2,
          providers: 1
        }
      ]
    }
  }
});