import { firestore } from './firebase-admin';
import { compareDesc, compareAsc, parseISO } from 'date-fns';

export async function getSite(siteId) {
  const doc = await firestore.collection('ghost_sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };
  return { site };
}

export async function createPreview(siteId, slug, data) {
  await firestore
    .collection('ghost_sites')
    .doc(siteId)
    .collection('pages')
    .doc(slug)
    .set(data);
}

export async function getPreview(siteId, slug) {
  try {
    const doc = await firestore
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
  const snapshot = await firestore
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

export async function createWebhook(siteId, eventName, data) {
  await firestore
    .collection('ghost_sites')
    .doc(siteId)
    .collection('webhooks')
    .doc(eventName)
    .set(data);
}

export async function getWebhooks(siteId) {
  const snapshot = await firestore
    .collection('ghost_sites')
    .doc(siteId)
    .collection('webhooks')
    .get();

  const webhooks = [];

  snapshot.forEach((doc) => {
    webhooks.push({ id: doc.id, ...doc.data() });
  });

  return { webhooks };
}
