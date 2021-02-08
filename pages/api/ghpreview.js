// this is the public version of ghost.js
const GhostAdminAPI = require('@tryghost/admin-api');
const dbAdmin = require('@/lib/db-admin');
import truncateHtml from '@/utils/truncateHtml';

export default async (req, res) => {
  const siteId = req.query.siteId;
  const slug = req.query.slug;

  //TODO: peridoically pull all posts and store their slugs
  if (
    slug === '' ||
    slug === 'signup' ||
    slug === 'signin' ||
    slug === 'membership'
  ) {
    res.status(200).send({});
    return;
  }

  if (siteId && slug) {
    const startTime = new Date();
    const { site } = await dbAdmin.getSite(siteId);
    console.log('Get site', new Date().getTime() - startTime.getTime(), 'ms');
    console.log(site);

    try {
      const { preview } = await dbAdmin.getPreview(siteId, slug);
      let response = null;
      if (!preview) {
        const api = new GhostAdminAPI({
          url: site.apiUrl,
          key: site.apiKey,
          version: 'v3',
        });

        console.log(
          'Init api',
          new Date().getTime() - startTime.getTime(),
          'ms'
        );

        response = await api.posts.read({ slug: slug, formats: 'html' });
        console.log(
          'Read post',
          new Date().getTime() - startTime.getTime(),
          'ms'
        );

        response.html = truncateHtml(
          response.html,
          site.previewLength,
          site.previewRatio
        );

        console.log(
          'Truncate',
          new Date().getTime() - startTime.getTime(),
          'ms'
        );

        const data = {
          html: response.html,
          createdAt: new Date().toISOString(),
        };
        try {
          await dbAdmin.createPreview(siteId, slug, data);
        } catch (error) {
          console.log(error);
          console.log('Failed to add preview to db');
        }
      } else {
        // use existing preview, might bs stale
        //TODO fix this, but checking whether the settings are updated after the preview creation time
        console.log(site.createdAt, site.updatedAt, preview.createdAt);
        const diffTime = new Date() - new Date(preview.createdAt);
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        const diffMins = diffTime / (1000 * 60);
        console.log(diffTime, diffMins, diffDays);
        // response = { html: 'Using exsting preview' };
        response = preview;
      }

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
