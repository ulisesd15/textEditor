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
  console.log('put to the database');
  //create connection to the database
  const db = await openDB('jate', 1);
  //create a transaction
  const tx = db.transaction('jate', 'readwrite');
  //open up the object store
  const store = tx.objectStore('jate');
  //use the add method to add the content to the database
  const request = store.add(content);
  //get confirmation that the content was added to the database
  const result = await request;
  console.log('data saved' , result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('get from the database');
  //create connection to the database
  const db = await openDB('jate', 1);
  //create a transaction
  const tx = db.transaction('jate', 'readonly');
  //open up the object store
  const store = tx.objectStore('jate');
  //use the getAll method to get all the content from the database
  const request = store.getAll();
  //get the content from the database
  const result = await request;
  console.log('data retrieved', result);
};

initdb();
