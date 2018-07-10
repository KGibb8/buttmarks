const isBookmark = require('../sync/isBookmark')

module.exports = function (server) {
  return function publish (params, callback) {
    const bookmark = Object.assign({}, { type: 'type' }, params)
    if (!isBookmark(bookmark)) {
      var errors = bookmark.errors.map(e => `${e.field}: ${e.message}`)
      return callback(new Error(`invalid bookmark: ${errors}`))
    }
    server.publish(bookmark, callback)
  }
}
