module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '^/api/flow/v1/': {
        target: 'http://localhost:3000'
      },
      '^/api/flow/captain/v1/': {
        target: 'http://localhost:3001'
      }
    }
  }
}