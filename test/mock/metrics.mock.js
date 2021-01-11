const { addInteractionHandler } = require('pactum').handler;

addInteractionHandler('get analyses metrics', () => {
  return {
    request: {
      method: 'GET',
      path: '/api/flow/v1/metrics/analyses/{id}',
      pathParams: {
        id: '5ff16643d9729c27c09447a0'
      }
    },
    response: {
      status: 200,
      body: {
        "_id": "5ff16643d9729c27c09447a0",
        "__v": 0,
        "consumers": {
          "all": [],
          "new": [],
          "removed": [],
          "_id": "5ff16643d9729c27c09447b5"
        },
        "flows": {
          "all": [
            "5ff16643d9729c27c09447a2"
          ],
          "new": [
            "5ff16643d9729c27c09447a2"
          ],
          "removed": [],
          "_id": "5ff16643d9729c27c09447b6"
        },
        "interactions": {
          "all": [
            "5ff16643d9729c27c09447a1"
          ],
          "new": [
            "5ff16643d9729c27c09447a1"
          ],
          "removed": [],
          "_id": "5ff16643d9729c27c09447b3"
        },
        "projectId": "pactum_flow-api",
        "providers": {
          "all": [
            "user-service"
          ],
          "new": [
            "user-service"
          ],
          "removed": [],
          "_id": "5ff16643d9729c27c09447b4"
        }
      }
    }
  }
});