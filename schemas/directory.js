const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'name'],
  properties: {
    type: {
      type: 'string',
      pattern: '^bookmarks/directory$'
    },
    name: {
      type: 'string',
      pattern: '^[A-Za-z0-9]$'
    }
  },
  definitions: definitions
}
