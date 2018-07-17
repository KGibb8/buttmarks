const { describe } = require('tape-plus')

const Server = require('scuttle-testbot')
const PublishBookmark = require('../../../bookmarks/async/publish')

describe('bookmarks.async.publish', context => {
  let server
  let params
  let publishBookmark

  context.beforeEach(c => {
    server = Server()

    params = {
      name: 'Monkey Island Walkthrough',
      root: '%viiJnnnXjNkfCALivEZbrDe8UndkCCCNQ/CgBOWgJLw=.sha256'
    }

    publishBookmark = PublishBookmark(server)
  })

  context.afterEach(c => {
    server.close()
  })

  context('successfully publishes when valid', (assert, next) => {
    populateDB((err, post) => {
      publishBookmark(params, (err, bookmark) => {
        assert.ok(bookmark)
        assert.notOk(err)
        next()
      })
    })
  })

  context('fails to publish when invalid', (assert, next) => {
    populateDB((err, post) => {
      delete params.name
      params.description = "Monkey Island Walkthrough"
      publishBookmark(params, (err, bookmark) => {
        assert.ok(err)
        assert.equal(err.message, "data.name: is required")
        next()
      })
    })
  })

  function populateDB (callback) {
    server.publish({ type: 'post' }, (err, post) => {
      if (err) throw err
      else return callback(null, post)
    })
  }
})
