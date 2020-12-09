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
          main: ['id1', 'id2']
        }
      },
      {
        _id: 'id2',
        name: '[AVG] project-jupiter',
        analysis: {
          main: []
        }
      },
      {
        _id: 'id3',
        name: '[TRD] hulk-hogan',
        analysis: {
          main: ['id3', 'id4', 'id5']
        }
      }
    ]
  }
});

mock.addMockInteraction({
  withRequest: {
    method: 'POST',
    path: '/api/flow/v1/analysis/search'
  },
  willRespondWith: {
    status: 200,
    body: [
      {
        _id: 'id2',
        flows: ['fid1', 'fid2'],
        consumers: [],
        providers: ['[TRD] hulk-hogan']
      },
      {
        _id: 'id5',
        flows: [],
        consumers: ['[AVG] project-mars'],
        providers: []
      }
    ]
  }
});