const pull = require('pull-stream')
const next = require('pull-next-query')
const sort = require('pull-sort')

const isBookmark = require('../sync/isBookmark')

module.exports = function (server) {
  return function mine (opts) {
    const id = server.id

    return pull(
      next(server.query.read, optsWithQuery(), ['value', 'timestamp']),
      pull.filter(isBookmark),
      sort(orderByTimestamp)
    )

    function optsWithQuery () {
      return Object.assign({}, {
        limit: 100,
        query: [{
          $filter: {
            value: {
              author: id,
              timestamp: { $gt: 0 },
              content: { type: 'bookmark' }
            }
          }
        }]
      }, opts)
    }

    function orderByTimestamp () {
      return (a, b) => {
        return opts.reverse
          ? a.value.timestamp > b.value.timestamp ? -1 : +1
          : a.value.timestamp < b.value.timestamp ? -1 : +1
      }
    }
  }
}
