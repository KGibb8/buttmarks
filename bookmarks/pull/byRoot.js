const pull = require('pull-stream')
const next = require('pull-next-query')
const sort = require('pull-sort')

const { isMsgId } = require('ssb-ref')
const isBookmark = require('../sync/isBookmark')

module.exports = function (server) {
  return function byRoot (opts) {
    const root = opts.root

    if (!root || !isMsgId(root)) throw new Error('root: must be a valid ssb message ID')
    delete opts.root

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
              timestamp: { $gt: 0 },
              content: {
                type: 'bookmark',
                root: root
              }
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
