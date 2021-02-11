import { withAuth } from '@/lib/middlewares';
import * as dbAdmin from '@/lib/db-admin';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { siteId } = req.query;
      const { site } = await dbAdmin.getSite(siteId);

      return res.status(200).json({ site });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { siteId } = req.query;
      const details = await dbAdmin.deleteSite(siteId);
      return res.status(200).json(details);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(400).end('method not allowed');
};

export default withAuth(handler);
