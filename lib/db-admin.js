import { db } from './firebase-admin';

export async function getSite(siteId) {
  const doc = await db.collection('ghost_sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };
  return { site };
}
