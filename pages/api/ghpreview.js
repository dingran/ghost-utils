// this is the public version of ghost.js
const GhostAdminAPI = require('@tryghost/admin-api');
const dbAdmin = require('@/lib/db-admin');
import { parseISO, format } from 'date-fns';
import truncateHtml from '@/utils/truncateHtml';

const pretty = (date) => format(parseISO(date), 'Pp');

export default async (req, res) => {
  const siteId = req.query.siteId;
  const slug = req.query.slug;

  if (siteId && slug) {
    const startTime = new Date();
    const clientSettings = {}; //hold publiclly accessible settings for the client
    const { site } = await dbAdmin.getSite(siteId);
    console.log('Get site', new Date().getTime() - startTime.getTime(), 'ms');
    console.log(site);
    if (site.failed) {
      res.statusCode = 400;
      res.json({
        error: `Your site ${site.id} does not exist, please delete your ghutil client script`,
      });
      return;
    }

    clientSettings.indexOfChildrenToDelete = site.indexOfChildrenToDelete;
    clientSettings.bgColor = site.bgColor;

    try {
      const { preview } = await dbAdmin.getPreview(siteId, slug);
      let response = null;
      let info = '';

      if (site.updatedAt) console.log('site updated', pretty(site.updatedAt));
      console.log('site created', pretty(site.createdAt));
      if (preview?.createdAt)
        console.log('preview created', pretty(preview?.createdAt));
      preview?.createdAt &&
        console.log(
          'preview created after site updated, thus ok to use:',
          (site.updatedAt || site.createdAt) < preview.createdAt
        );
      // has preview and preview is created after site updated
      if (preview && (site.updatedAt || site.createdAt) < preview.createdAt) {
        info = 'using existing preview from db';
        console.log(info);
        response = preview;
      } else {
        info = 'creating new preview';
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

        try {
          response = await api.posts.read({ slug: slug, formats: 'html' });
        } catch (error) {
          if (error.type === 'NotFoundError') {
            response = await api.pages.read({ slug: slug, formats: 'html' });
          } else {
            console.log(error);
            throw error;
          }
        }
        console.log(
          'Read post',
          new Date().getTime() - startTime.getTime(),
          'ms'
        );

        response.html = truncateHtml(
          response.html,
          site.previewLength,
          site.previewRatio,
          site.maxLength
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
      }

      res.statusCode = 200;
      res.json({
        response,
        info,
        clientSettings,
      });
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
