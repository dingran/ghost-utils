import { withAuth } from '@/lib/middlewares';
import { getSite } from '@/lib/db-admin';

const handler = async (req, res) => {
  try {
    const { siteId } = req.query;
    const { site } = await getSite(siteId);

    res.status(200).json({ site });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default withAuth(handler);
