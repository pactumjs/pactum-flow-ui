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
        _id: 'pid1',
        name: '[AVG] project-mars',
        analysis: {
          main: ['aid1', 'aid2']
        }
      },
      {
        _id: 'pid2',
        name: '[AVG] project-jupiter',
        analysis: {
          main: []
        }
      },
      {
        _id: 'pid3',
        name: '[TRD] hulk-hogan',
        analysis: {
          main: ['aid3', 'aid4', 'aid5']
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
        _id: 'aid2',
        flows: ['fid1', 'fid2', 'fid3'],
        endpoints: 0,
        consumers: [],
        providers: ['[TRD] hulk-hogan']
      },
      {
        _id: 'aid5',
        flows: [],
        endpoints: 0,
        consumers: ['[AVG] project-mars'],
        providers: []
      }
    ]
  }
});

mock.addMockInteraction({
  withRequest: {
    method: 'GET',
    path: '/api/flow/v1/project/pid1'
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
});

mock.addMockInteraction({
  withRequest: {
    method: 'GET',
    path: '/api/flow/v1/analysis/aid2'
  },
  willRespondWith: {
    status: 200,
    body: {
      _id: 'aid2',
      flows: ['fid1', 'fid2', 'fid3'],
      endpoints: 0,
      consumers: [],
      providers: ['[TRD] hulk-hogan']
    }
  }
});

mock.addMockInteraction({
  withRequest: {
    method: 'POST',
    path: '/api/flow/v1/flows/search'
  },
  willRespondWith: {
    status: 200,
    body: [
      {
        _id: 'fid1',
        name: 'get all users',
        request: {
          method: 'GET',
          path: '/api/users'
        },
        response: {
          statusCode: 200
        }
      },
      {
        _id: 'fid2',
        name: 'post a user',
        request: {
          method: 'POST',
          path: '/api/user/{userId}'
        },
        response: {
          statusCode: 200
        }
      },
      {
        _id: 'fid3',
        name: 'delete a non-existent user',
        request: {
          method: 'DELETE',
          path: '/api/user/{userId}'
        },
        response: {
          statusCode: 400
        }
      }
    ]
  }
});