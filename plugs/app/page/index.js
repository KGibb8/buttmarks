const nest = require('depnest')
const { h } = require('mutant')
const Scuttle = require('../../../bookmarks/index')

const BookmarksIndex = require('../../../views/index')

exports.gives = nest({
  'app.html.menuItem': true,
  'app.page.bookmarksIndex': true
})

exports.needs = nest({'sbot.obs.connection': 'first'})

exports.create = (api) => {
  return nest({
    'app.html.menuItem': menuItem,
    'app.page.bookmarksIndex': bookmarksIndexPage
  })

  function bookmarksIndexPage (location) {
    const scuttle = Scuttle(api.sbot.obs.connection)

    const page = h('Bookmarks -index', { title: '/bookmarks' }, [
      h('h1', "BOOKMARKS"),
      BookmarksIndex()
    ])

    page.scroll = () => {}
    return page
  }

  function menuItem () {
    return h('a', {
      style: { order: 1 },
      'ev-click': () => api.app.sync.goTo({ page: 'bookmarks'  }) },
      '/bookmarks'
    )
  }
}
