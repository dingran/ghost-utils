const GhostAdminAPI = require('@tryghost/admin-api');
const dbAdmin = require('@/lib/db-admin');
import { withAuth } from '@/lib/middlewares';
const TurndownService = require('turndown');
const turndownService = new TurndownService();

const handler = async (req, res) => {
  const siteId = req.query.siteId;
  const slug = req.query.slug;
  if (!siteId || !slug) {
    return res
      .status(400)
      .json({ error: 'Please include siteId and slug in your query params' });
  }

  let site = {};
  try {
    const data = await dbAdmin.getSite(siteId);
    site = data.site;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Can't get site ${siteId}` });
  }

  // if (site.authorId !== req.uid) {
  //   return res.status(403).json({
  //     error: `Your user id (${req.uid}) does not match site owner's user id ${site.authorId}`,
  //   });
  // }

  const apiUrl = site.apiUrl;
  const apiKey = site.apiKey;

  console.log(apiUrl, apiKey);

  let api = null;
  let response = null;
  try {
    api = new GhostAdminAPI({
      url: apiUrl,
      key: apiKey,
      version: 'v3',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Unable to initialized Ghost API' });
  }

  try {
    response = await api.posts.read({ slug: slug, formats: 'html' });
    const markdown = turndownService.turndown(response.html);

    // return res.status(200).json({ message: 'success', markdown });

    const content = markdown;
    const filename = `${slug}.md`;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // without this, content will display in the browser
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.end(content);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// export default withAuth(handler);
export default handler;
