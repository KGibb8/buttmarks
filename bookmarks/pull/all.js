const pull = require('pull-stream')
const sort = require('pull-sort')

const isBookmark = require('../sync/isBookmark')

module.exports = function (server) {
  return function all (opts) {
    var _opts = Object.assign({}, { type: 'bookmark' }, opts)

    return pull(
      server.messagesByType(_opts),
      pull.filter(isBookmark),
      sort(orderByTimestamp)
    )

    function orderByTimestamp () {
      return (a, b) => {
        return opts.reverse
          ? a.value.timestamp > b.value.timestamp ? -1 : +1
          : a.value.timestamp < b.value.timestamp ? -1 : +1
      }
    }
  }
}
