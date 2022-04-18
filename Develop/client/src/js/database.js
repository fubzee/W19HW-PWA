import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate',1);
  const tx = jateDb.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ jate: content });
  const result = await request;
  if (!result) {return console.error('putDb not implemented')};
  console.log('🚀 - data saved to the database', result);
  // return result;
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate',1);
  console.log('jate opened',jateDb)
  const tx = jateDb.transaction('jate','readonly');
  console.log('readonly',tx);
  const store = tx.objectStore('jate');
  console.log('store',store);
  const request = store.getAll();
  const result = await request;
  console.log(result);
  let listitem = ' ';
  for (let data of result) {
    listitem += `${data.id} ${data.jate}`
  }
  return listitem;
};

initdb();