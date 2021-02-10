import firebase from './firebase';
import { compareDesc, compareAsc, parseISO } from 'date-fns';
const firestore = firebase.firestore();

export async function createUser(uid, data) {
  return await firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function createSite(data) {
  const site = firestore.collection('ghost_sites').doc(); // returns DocRef
  await site.set(data); // returns Promise<void>, so we need to await
  return site;
}

export async function updateSite(siteId, data) {
  const site = firestore.collection('ghost_sites').doc(siteId);
  await site.set(data, { merge: true }); // returns Promise<void>, so we need to await
  return site;
}

export async function deleteSite(id) {
  // The followng is better done, in batches and on the server side due to unbounded number of deletes
  // see https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2
  let snapshot, batch;

  try {
    snapshot = await firestore.collection(`ghost_sites/${id}/webhooks`).get();
    batch = firestore.batch();
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  } catch (err) {
    console.log(err);
  }

  snapshot = await firestore.collection(`ghost_sites/${id}/pages`).get();
  batch = firestore.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // because we rely on this doc's authorId filed for firebase rule for subcollections webhooks and pages
  // we need to first delete those collection and delete the doc last
  await firestore.collection('ghost_sites').doc(id).delete();
}

export async function getSite(siteId) {
  const doc = await firestore.collection('ghost_sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };
  return site;
}

// test to see if this works on the client side
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
