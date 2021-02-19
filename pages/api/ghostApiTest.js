// used for testing whether API key and url works in site registration process
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
    return res.status(400).json({ error: error.message });
  }

  try {
    const response = await api.posts.browse({ limit: 1 }); // test call

    // need to check that repsponse is not undefined
    if (typeof response === 'undefined') {
      const error = new Error('response is undefined, probably wrong api Url');
      error.status = 400;
      throw error;
    }
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({ error: error.message });
  }
};
