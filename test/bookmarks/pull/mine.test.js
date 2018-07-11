const { describe } = require('tape-plus')
const pull = require('pull-stream')
const Source = require('../../../bookmarks/pull/mine')

const Server = require('scuttle-testbot')

describe('bookmarks.pull.mine', context => {
  let server, grace
  let source

  context.beforeEach(c => {
    server = Server
      .use(require('ssb-query'))
      .call()

    grace = server.createFeed()
    source = Source(server)
  })

  context.afterEach(c => {
    server.close()
  })

  context("collects all messages by server's ID", (assert, next) => {
    populateDB((err, post) => {
      const values = [
        { server: server, content: { type: 'bookmark', root: post.key, description: '1' } },
        { server: grace, content: { type: 'bookmark', root: post.key, description: '2' } },
        { server: server, content: { type: 'bookmark', root: post.key, description: '3' } }
      ]

      pull(
        pull.values(values),
        pull.asyncMap((data, cb) => data.server.publish(data.content, cb)),
        pull.collect((err, msgs) => {
          pull(
            source(),
            pull.collect((err, msgs) => {
              assert.notOk(err, 'no errors')

              const authors = Array.from(new Set(msgs.map(m => m.value.author)))
              assert.equal(authors.length, 1, 'only one author')
              assert.equal(authors[0], (server.id), 'author matches server')

              assert.deepEqual(
                values.filter(m => m.server.id !== grace.id).map(m => m.content),
                msgs.map(m => m.value.content),
                'message content matches'
              )

              next()
            })
          )
        })
      )
    })
  })

  function populateDB (callback) {
    server.publish({ type: 'post' }, (err, post) => {
      if (err) throw err
      else return callback(null, post)
    })
  }
})

