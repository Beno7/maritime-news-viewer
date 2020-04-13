const { NewsService } = require('../../services');
const { ResponseFactory } = require('../../factories');

module.exports = new NewsController();

function NewsController() {
  const self = this;

  this.getNews = async (req, res) => {
    const { sources, page, pageSize } = req.query;
    try {
      const news = await NewsService.getNews(sources, page, pageSize);
      res.status(200).json(ResponseFactory('success', 'DATA_FETCHED', news));
    } catch(err) {
      console.error('UNHANDLED ERROR', err);
      res.status(500).json(ResponseFactory('error', 'INTERNAL_SERVER_ERROR'));
    }
  };

  this.getSources = async (req, res) => {
    try {
      res.status(200).json(ResponseFactory('success', 'DATA_FETCHED', await NewsService.getSources()));
    } catch(err) {
      console.error('UNHANDLED ERROR', err);
      res.status(500).json(ResponseFactory('error', 'INTERNAL_SERVER_ERROR'));
    }
  };

}
