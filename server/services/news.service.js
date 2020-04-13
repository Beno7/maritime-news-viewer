const { newsRepository } = require('../configs/constants');
const { get } = require('./request.service');

module.exports = new NewsService();

function NewsService() {
  const self = this;

  /**
   * Retrieves News Sources
   * @async
   */
  this.getSources = async () => {
    return await get(newsRepository.endpoints.sources, { apiKey: newsRepository.apiKey });
  }

  /**
   * Retrieves News
   * @async
   * @param sources string
   * @param page Number
   * @param pageSize Number
   */
  this.getNews = async (sources, page, pageSize) => {
    const queryParams = {
      sortBy: 'publishedAt',
      q: 'maritime',
      apiKey: newsRepository.apiKey,
    };
    if (page !== null && page !== undefined) {
      queryParams['page'] = page;
    }
    if (pageSize !== null && pageSize !== undefined) {
      queryParams['pageSize'] = pageSize;
    }
    if (sources) {
      queryParams['sources'] = sources;
    }
    return await get(newsRepository.endpoints.everything, queryParams);
  }

}
