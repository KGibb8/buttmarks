const fs = require('fs')
const { describe } = require('tape-plus')

const isBookmark = require('../../../bookmarks/sync/isBookmark')

describe('bookmarks.sync.isBookmark', context => {
  let bookmark

  context.beforeEach(c => {
    bookmark = JSON.parse(fs.readFileSync('./test/fixtures/bookmark.json', 'utf8'))
  })

  context('valid', assert => {
    assert.ok(isBookmark(bookmark))
  })

  context('invalid: type', assert => {
    bookmark.type = 'bkmark'
    assert.notOk(isBookmark(bookmark))

    var errors = bookmark.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.type: pattern mismatch'])
  })

  context('invalid: root', assert => {
    bookmark.root = 'isnotamessageid'
    assert.notOk(isBookmark(bookmark))

    var errors = bookmark.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.root: referenced schema does not match'])
  })

  context('invalid: name', assert => {
    bookmark.name = { name: 'describe mee' }
    assert.notOk(isBookmark(bookmark))

    var errors = bookmark.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.name: is the wrong type'])
  })
})
