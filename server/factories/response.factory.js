const {messages} = require('../configs');

module.exports = ResponseFactory;

/**
 * Parses a Response
 * @param type 'success' | 'error'
 * @param message string
 * @param data any
 * @throws 'InvalidExpressResponse'
 * @returns {type: 'success' | 'error', message: string, data: any}
 */
function ResponseFactory(type = null, message = null, data = null) {
  if (type === 'success' || type === 'error') {
    const response = {type, message, data};
    if (messages[message]) { // If message is code
      response.code = message;
      response.message = messages[message];
    }
    return response;
  }
  throw new Error('InvalidExpressResponse');
}
