const GhostAdminAPI = require('@tryghost/admin-api');
const dbAdmin = require('@/lib/db-admin');
import { auth } from '@/lib/firebase-admin';

export default async (req, res) => {
  // auth protection
  // const { uid } = await auth.verifyIdToken(req.headers.token)

  const siteId = req.query.siteId;
  const { site } = await dbAdmin.getSite(siteId);
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
    res.json({ error });
    return;
  }

  const op = req.query.op;

  if (op === 'create') {
    const event = req.query.event;
    try {
      const events = [
        'post.published',
        'post.published.edited',
        'post.unpublished',
      ];
      events.forEach(async (val) => {
        const payload = {
          event: val,
          target_url: 'https://utils.dingran.me/api/ghosthook/',
        };

        try {
          const response = await api.webhooks.add(payload);
          dbAdmin.createWebhook(siteId, payload.event, response);
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
  }
};
