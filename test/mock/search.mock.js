const { addInteractionHandler } = require('pactum').handler;

addInteractionHandler('search analyses', () => {
  return {
    request: {
      method: 'POST',
      path: '/api/flow/v1/search/analyses',
      body: {
        "ids": [
          "5ff16643d9729c27c09447a0"
        ]
      }
    },
    response: {
      status: 200,
      body: [
        {
          "branch": "main",
          "version": "1.0.1",
          "processed": true,
          "interactions": 1,
          "flows": 17,
          "providers": 1,
          "consumers": 0,
          "_id": "5ff16643d9729c27c09447a0",
          "projectId": "pactum_flow-api",
          "createdAt": "2021-01-03T06:37:55.766Z",
          "__v": 0
        }
      ]
    }
  }
});