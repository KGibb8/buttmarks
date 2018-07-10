const pull = require('pull-stream')
const sort = require('pull-sort')
const isBookmark = require('../sync/isBookmark')

module.exports = function (server) {
  return function all (opts) {
    var id = server.id

    return pull(
      next(server.query.read, optsWithQuery(), ['value', 'timestamp']),
      sort(compare),
      pull.filter(isBookmark)
    )

    function optsWithQuery () {
      return Object.assign({}, {
        limit: 100,
        query: [{
          $filter: {
            value: {
              author: id,
              timestamp: { $gt: 0 }
              content: { type: 'bookmark' }
            }
          }
        }]
      }, opts)
    }

    function compare () {
      return (a, b) => {
        return opts.reverse
          ? a.value.timestamp > b.value.timestamp ? -1 : +1
          : a.value.timestamp < b.value.timestamp ? -1 : +1
      }
    }
  }
}
