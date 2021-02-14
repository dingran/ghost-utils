// create Ghost webhooks bsaed on siteId
const GhostAdminAPI = require('@tryghost/admin-api');
const dbAdmin = require('@/lib/db-admin');
import { withAuth } from '@/lib/middlewares';

const handler = async (req, res) => {
  const siteId = req.query.siteId;
  if (!siteId) {
    return res
      .status(400)
      .json({ error: 'Please include siteId in query params' });
  }

  let site = {};
  try {
    const data = await dbAdmin.getSite(siteId);
    site = data.site;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Can't get site ${siteId}` });
  }

  if (site.authorId !== req.uid) {
    return res.status(403).json({
      error: `Your user id (${req.uid}) does not match site owner's user id ${site.authorId}`,
    });
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
    return res.status(400).json({ error: 'Unable to initialized Ghost API' });
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
        target_url: `https://ghutils.dingran.me/api/ghosthook?siteId=${siteId}`,
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

    return res.status(200).json({ message: 'success', webhooks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default withAuth(handler);
