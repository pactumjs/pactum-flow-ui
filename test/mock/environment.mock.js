const { addInteractionHandler } = require('pactum').handler;

addInteractionHandler('get environments', () => {
  return {
    request: {
      method: 'GET',
      path: '/api/flow/v1/environments'
    },
    response: {
      status: 200,
      body: [
        {
          "_id": "latest",
          "__v": 0,
          "projects": {
            "pactum_flow-api": "5ff16643d9729c27c09447a0"
          }
        }
      ]
    }
  }
});