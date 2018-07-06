const { isBookmark } = require('./schemas/isBookmark')

module.exports = {
  bookmarks: {
    async: {
      get: require('./bookmarks/async/get')
    },
    pull: {
      all: require('./booksmarks/pull/all'),
      byRoot: require('./bookmarks/pull/byRoot')
    },
    sync: {
      isBookmark: () => isBookmark
    }
  }
}
