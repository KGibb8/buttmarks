module.exports = {
  bookmarks: {
    async: {
      publish: require('./bookmarks/async/publish'),
      get: require('./bookmarks/async/get')
    },
    pull: {
      all: require('./bookmarks/pull/all'),
      byRoot: require('./bookmarks/pull/byRoot'),
      mine: require('./bookmarks/pull/mine')
    },
    sync: {
      isBookmark: () => require('./bookmarks/sync/isBookmark')
    }
  }
}
