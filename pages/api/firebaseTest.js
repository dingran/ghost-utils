import { getSite } from '@/lib/db-admin';

export default async (req, res) => {
  const site = req.query.site;
  try {
    const response = await getSite(site);
    res.statusCode = 200;
    res.json({ response });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ error });
  }
};
