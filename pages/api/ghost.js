// The admin API client is the easiest way to use the API
const GhostAdminAPI = require('@tryghost/admin-api');
const truncate = require('truncate-html');
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const TRUNCATION_LENGTH = 500;

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const api = new GhostAdminAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_ADMIN_KEY,
  version: 'v3',
});

export default async (req, res) => {
  await cors(req, res);
  const slug = req.query.slug;
  if (slug) {
    const length = TRUNCATION_LENGTH;
    try {
      const response = await api.posts.read({ slug: slug, formats: 'html' });
      response.html = truncate(response.html, length);
      res.statusCode = 200;
      res.json({ response });
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.json({ error });
    }
  } else {
    res.statusCode = 400;
    res.json({ error: 'must provide slug in request query parameter' });
  }
};
