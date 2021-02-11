import { firestore } from './firebase-admin';
const GhostAdminAPI = require('@tryghost/admin-api');
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

export async function deleteSite(siteId) {
  // The followng is better done, in batches and on the server side due to unbounded number of deletes
  // see https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2
  let snapshot, batch;

  const { site } = await getSite(siteId);
  const apiUrl = site.apiUrl;
  const apiKey = site.apiKey;
  const api = new GhostAdminAPI({
    url: apiUrl,
    key: apiKey,
    version: 'v3',
  });

  const wehbooks = [];
  const details = {};

  // delete the webhooks in db
  details.webhooksDeleted = [];
  snapshot = await firestore.collection(`ghost_sites/${siteId}/webhooks`).get();
  batch = firestore.batch();
  snapshot.forEach(async (doc) => {
    const docData = doc.data();
    wehbooks.push({ id: docData.id, eventName: doc.id });
    batch.delete(doc.ref);
  });
  await batch.commit();

  // delete the webhooks in Ghost
  for (const webhook of wehbooks) {
    try {
      await api.webhooks.delete({ id: webhook.id });
      webhook.success = 'successfully deleted';
    } catch (error) {
      webhook.error = error.message;
    } finally {
      details.webhooksDeleted.push(webhook);
    }
  }

  // delete pages in db
  details.pagesDeleted = [];
  snapshot = await firestore.collection(`ghost_sites/${siteId}/pages`).get();
  batch = firestore.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
    details.pagesDeleted.push({ id: doc.id });
  });
  await batch.commit();

  // deleting the site record last, in case we still need its info
  await firestore.collection('ghost_sites').doc(siteId).delete();
  details.siteDeleted = siteId;
  return details;
}
