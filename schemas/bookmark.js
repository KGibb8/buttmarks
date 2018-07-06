const definitions = require('../lib/definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'root', 'description', 'directory'],
  properties: {
    type: {
      type: 'string',
      pattern: '^bookmark$'
    },
    root: { $ref: '#/definitions/messageId' },
    description: { type: 'string' },
    directory: {
      oneof: [
        { type: 'null' },
        { $ref: '#/definitions/messageId' }
      ]
    }
  },
  definitions: definitions
}
