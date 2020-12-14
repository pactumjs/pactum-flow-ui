const { addMockInteractionHandler } = require('pactum').handler;

addMockInteractionHandler('get analysis aid2', () => {
  return {
    withRequest: {
      method: 'GET',
      path: '/api/flow/v1/analysis/aid2'
    },
    willRespondWith: {
      status: 200,
      body: {
        _id: 'aid2',
        flows: ['fid1', 'fid2', 'fid3', 'fid4', 'fid5'],
        endpoints: 0,
        consumers: [],
        providers: ['[TRD] hulk-hogan']
      }
    }
  }
});