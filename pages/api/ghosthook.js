import * as dbAdmin from '@/lib/db-admin';
import truncateHtml from '@/utils/truncateHtml';

export default async (req, res) => {
  // console.log('req.body', req.body);
  console.log('req.query', req.query);
  // console.log('req.headers', req.headers);

  const { siteId } = req.query;
  if (!siteId) {
    const error = 'Please inlcude siteId in query param';
    console.log(error);
    return res.status(400).json({ error });
  }

  const slug = req?.body?.post?.current?.slug;
  const currentHtml = req?.body?.post?.current?.html;
  const visibility = req?.body?.post?.current?.visibility;
  if (visibility === 'public') {
    return res
      .status(200)
      .json({ message: 'not generating preview for for public content' });
  }

  if (!slug || !currentHtml) {
    const error = 'Bad request body, did not contain slug or html';
    console.log(error);
    return res.status(400).json({ error });
  }

  const data = {
    html: '',
    createdAt: new Date().toISOString(),
  };

  try {
    const { site } = await dbAdmin.getSite(siteId);
    console.log('pulled site setting from db');

    data.html = truncateHtml(
      currentHtml,
      site.previewLength,
      site.previewRatio,
      site.maxLength
    );

    console.log('truncatd html');
  } catch (error) {
    console.log('Failed to create preview');
    console.log(error);
  }

  try {
    await dbAdmin.createPreview(siteId, slug, data);
    console.log('added preview to db');
  } catch (error) {
    console.log('Failed to add preview to db');
    console.log(error);
  }

  return res.status(200).end();
};
