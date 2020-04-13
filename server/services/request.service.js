const fetch = require('node-fetch');

module.exports = new NewsService();

function _errorGenerator(res) {
  const error = new Error('Error ' + res.status + ': ' + res.statusText);
  error.response = res;
  throw error;
}

function NewsService() {
  const self = this;

  /**
   * Performs GET request
   * @param url string`
   * @param params any
   * default: {}
   * @throws 'Error {{status}}:statusText'
   * @returns any
   */
  this.get = async (url, params = {}) => {
    const paramKeys = Object.keys(params);
    const queryString = paramKeys
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    const newUrl = `${url}${paramKeys.length > 0 ? `?${queryString}` : ''}`;
    console.log('GET request:', newUrl);
    const res = await fetch(newUrl);
    return res.ok ? res.json() : _errorGenerator(res);
  }

}
