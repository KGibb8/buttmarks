const nest = require('depnest')

export.gives = nest('router.sync.routes')
export.needs = nest({
  'app.page.bookmarksIndex': 'first'
})

exports.create = (api) => {
  return nest('router.sync.routes', (soFar = []) => {
    const pages = api.app.page

    const routes = [
      [ loc => loc.page === 'bookmarks', pages.bookmarksIndex ]
    ]

    return [...soFar, ...routes]
  })
}
