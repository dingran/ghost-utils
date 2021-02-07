import { db } from './firebase-admin';
import { compareDesc, compareAsc, parseISO } from 'date-fns';

export async function getSite(siteId) {
  const doc = await db.collection('ghost_sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };
  return { site };
}

export async function createPreview(siteId, slug, data) {
  await db
    .collection('ghost_sites')
    .doc(siteId)
    .collection('pages')
    .doc(slug)
    .set(data);
}

export async function getPreview(siteId, slug) {
  try {
    const doc = await db
      .collection('ghost_sites')
      .doc(siteId)
      .collection('pages')
      .doc(slug)
      .get();

    if (doc.exists) {
      const preview = { id: doc.id, ...doc.data() };
      return { preview };
    } else {
      return { message: 'doc does not exist' };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
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
