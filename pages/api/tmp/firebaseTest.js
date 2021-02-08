import { getSite } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    req.uid = uid;
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ error: error.message });
    return;
  }

  const siteId = req.query.site;
  try {
    const { site } = await getSite(siteId);
    if (site.authorId === req.uid) {
      res.statusCode = 200;
      res.json({ site });
    } else {
      res.status(403).json({
        error: `Your user id (${req.uid}) does not match site owner's user id ${site.authorId}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ error });
  }
};
