import { auth } from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    req.uid = uid;
  } catch (error) {
    // token issues
    // console.log(error);
    const msg = { ...error.errorInfo };
    // console.log(msg);
    res.status(400).json(msg);
    return;
  }

  try {
    const { sites } = await getUserSites(req.uid);
    res.status(200).json({ sites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
