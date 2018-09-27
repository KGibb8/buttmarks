module.exports = {
  bookmarks: {
    app: {
      page: {
        index: require('./app/page/index')
      }
    },
    router: {
      sync: {
        routes: require('./router/sync/routes')
      }
    },
    styles: {
      mcss: require('./styles/mcss')
    }
  }
}
