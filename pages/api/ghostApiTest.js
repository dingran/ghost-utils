const GhostAdminAPI = require('@tryghost/admin-api');
// const dbAdmin = require('@/lib/db-admin');

export default async (req, res) => {
  const apiUrl = req.query.apiUrl;
  const apiKey = req.query.apiKey;
  console.log(apiUrl, apiKey);

  let api = null;
  try {
    api = new GhostAdminAPI({
      url: apiUrl,
      key: apiKey,
      version: 'v3',
    });
  } catch (error) {
    console.log(error);
    res.statusCode = 400;
    res.json({
      error,
    });
    return;
  }

  try {
    const response = await api.posts.browse({ limit: 1 }); // test call
    res.statusCode = 200;
    res.json({ response });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ error });
  }
};
