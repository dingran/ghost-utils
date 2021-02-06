import { db } from './firebase-admin';
import { compareDesc, compareAsc, parseISO } from 'date-fns';

export async function getSite(siteId) {
  const doc = await db.collection('ghost_sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };
  return { site };
}

export async function getUserSites(uid) {
  const snapshot = await db
    .collection('ghost_sites')
    .where('authorId', '==', uid)
    .get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };
}
