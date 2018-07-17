const definitions = require('../lib/schema/definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'root', 'name'],
  properties: {
    type: {
      type: 'string',
      pattern: '^bookmark$'
    },
    root: { $ref: '#/definitions/messageId' },
    name: { type: 'string' },
  },
  definitions: definitions
}
