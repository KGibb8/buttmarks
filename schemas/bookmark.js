const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'root', 'name'],
  properties: {
    type: {
      type: 'string',
      pattern: '^bookmarks/bookmark$'
    },
    root: { $ref: '#/definitions/messageId' },
    name: { type: 'string' },
  },
  definitions: definitions
}
