const schema = require('../../schemas/bookmark')
const validate = require('../../lib/schema/validator')

module.exports = validate(schema)
