const definitions = require('../lib/definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'name'],
  properties: {
    type: {
      type: 'string',
      pattern: '^bookmark-directory$'
    },
    name: {
      type: 'string',
      pattern: '^[A-Za-z0-9]$'
    }
  },
  definitions: definitions
}
