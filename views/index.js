const pull = require('pull-stream')
const { h, Array: MutantArray, map, throttle } = require('mutant')
const BookmarkShow = require('./component/show')

module.exports = function BookmarksIndex ({ scuttle }) {
  const bookmarks = getBookmarks()

  return h('BookmarkIndex', [
    map(bookmarks, BookmarkShow, { comparer })
  ])

  function getBookmarks () {
    const store = MutantArray([])

    pull(
      scuttle.pull.mine({ live: true }),
      pull.filter(m => !m.sync),
      pull.drain(bookmark => store.insert(bookmark, 0))
    )
    return throttle(store, 100)
  }
}

function comparer (a, b) { 
  return a && b && a.key === b.key
}
