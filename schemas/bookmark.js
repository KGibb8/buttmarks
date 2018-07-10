const definitions = require('../lib/schema/definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'root', 'description'],
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
