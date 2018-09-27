module.exports = {
  async: {
    publish: require('./async/publish'),
    get: require('./async/get')
  },
  pull: {
    all: require('./pull/all'),
    byRoot: require('./pull/byRoot'),
    mine: require('./pull/mine')
  },
  sync: {
    isBookmark: () => require('./sync/isBookmark')
  }
}
