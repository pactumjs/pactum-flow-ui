const { addInteractionHandler } = require('pactum').handler;

addInteractionHandler('get projects', () => {
  return {
    request: {
      method: 'GET',
      path: '/api/flow/v1/projects'
    },
    response: {
      status: 200,
      body: [
        {
          "_id": "pactum_flow-api",
          "name": "[PACTUM] flow-api",
          "createdAt": "2021-01-03T06:37:55.758Z",
          "__v": 0
        }
      ]
    }
  }
});