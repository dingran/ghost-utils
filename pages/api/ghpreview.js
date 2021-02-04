// this is the public version of ghost.js
const GhostAdminAPI = require('@tryghost/admin-api');
const truncate = require('truncate-html');
const dbAdmin = require('@/lib/db-admin');

export default async (req, res) => {
  const siteId = req.query.siteId;
  const slug = req.query.slug;

  if (siteId && slug) {
    const { site } = await dbAdmin.getSite(siteId);
    console.log(site);

    const api = new GhostAdminAPI({
      url: site.api_url,
      key: site.admin_api_key,
      version: 'v3',
    });

    const length = site.truncation_length || 500;

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
    res.json({
      error: 'must provide slug AND siteId in request query parameter',
    });
  }
};
