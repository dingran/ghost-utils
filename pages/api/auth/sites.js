import { withAuth } from '@/lib/middlewares';
import { getUserSites } from '@/lib/db-admin';

const handler = async (req, res) => {
  try {
    const { sites } = await getUserSites(req.uid);
    return res.status(200).json({ sites });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default withAuth(handler);
