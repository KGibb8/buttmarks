const isBookmark = require('../sync/isBookmark')

module.exports = function (server) {
  return function get (key, callback) {
    server.get(key, (err, value) => {
      if (err) return callback(err)
      else return callback(null, { key, value })
    })
  }
}
