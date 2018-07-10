const pull = require('pull-stream')
const sort = require('pull-sort')

module.exports = function (server) {
  return function all (opts) {
    var _opts = Object.assign({}, { type: 'bookmark' }, opts)

    return pull(
      server.messagesByType(_opts),
      sort(compare)
    )

    function compare () {
      return (a, b) => {
        return opts.reverse
          ? a.value.timestamp > b.value.timestamp ? -1 : +1
          : a.value.timestamp < b.value.timestamp ? -1 : +1
      }
    }
  }
}
