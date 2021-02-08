const GhostAdminAPI = require('@tryghost/admin-api');
const dbAdmin = require('@/lib/db-admin');
import { auth } from '@/lib/firebase-admin';

export default async (req, res) => {
  // auth
  if (!req.headers.token) {
    res.status(401);
    res.json({ error: 'Please include id token' });
    return;
  }
  const siteId = req.query.siteId;
  if (!siteId) {
    res.status(400);
    res.json({ error: 'Please include siteId in query params' });
    return;
  }

  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    req.uid = uid;
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ error: error.message });
    return;
  }

  // authorized
  let site = {};
  try {
    const data = await dbAdmin.getSite(siteId);
    site = data.site;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Can't get site ${siteId}` });
    return;
  }

  if (site.authorId !== req.uid) {
    res.status(403).json({
      error: `Your user id (${req.uid}) does not match site owner's user id ${site.authorId}`,
    });
    return;
  }

  const apiUrl = site.apiUrl;
  const apiKey = site.apiKey;

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
    res.json({ error: 'Unable to initialized Ghost API' });
    return;
  }

  try {
    const events = [
      'post.published',
      'post.published.edited',
      'post.unpublished',
    ];
    events.forEach(async (val) => {
      const payload = {
        name: val,
        event: val,
        target_url: `https://utils.dingran.me/api/ghosthook?siteId=${siteId}`,
        // target_url: `https://9fe4cde0519b.ngrok.io/api/ghosthook?siteId=${siteId}`,
      };

      try {
        const response = await api.webhooks.add(payload);
        await dbAdmin.createWebhook(siteId, payload.event, response);
      } catch (error) {
        if (
          error.context === 'Target URL has already been used for this event.'
        ) {
          console.log('webhook already exists', payload);
        } else {
          console.log(error);
        }
      }
    });

    const { webhooks } = await dbAdmin.getWebhooks(siteId);

    res.statusCode = 200;
    res.json({ message: 'success', webhooks });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ error });
  }
};
