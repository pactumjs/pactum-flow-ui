const { mock } = require('pactum');

mock.start(3000);

mock.addMockInteraction({
  withRequest: {
    method: 'GET',
    path: '/api/flow/v1/project'
  },
  willRespondWith: {
    status: 200,
    body: [
      {
        _id: 'id1',
        name: '[AVG] project-mars',
        analysis: {
          main: [ 'id1', 'id2' ]
        }
      },
      {
        _id: 'id2',
        name: '[AVG] project-jupiter',
        analysis: {
          main: [ ]
        }
      },
      {
        _id: 'id3',
        name: '[TRD] hulk-hogan',
        analysis: {
          main: [ 'id1', 'id2', 'id3' ]
        }
      }
    ]
  }
});