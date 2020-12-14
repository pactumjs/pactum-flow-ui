const { addMockInteractionHandler } = require('pactum').handler;

addMockInteractionHandler('get project pid1', () => {
  return {
    withRequest: {
      method: 'GET',
      path: '/api/flow/v1/projects/pid1'
    },
    willRespondWith: {
      status: 200,
      body: {
        _id: 'pid1',
        name: '[AVG] project-mars',
        analysis: {
          main: ['aid1', 'aid2']
        }
      }
    }
  }
});