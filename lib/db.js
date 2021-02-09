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
