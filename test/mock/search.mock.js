const { addMockInteractionHandler } = require('pactum').handler;

addMockInteractionHandler('search flows', () => {
  return {
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
  }
});