import {openDB} from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () => {
    // creating a new database named 'contact_db' using version 1 of the database
    openDB("contact_db", 1, {
        // add database schema if it hasn't been initialized already
        upgrade(db) {
            if(db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            // create a new object store for the data and give it key name of 'id' which will auto increment
            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            console.log('contacts store created');
        }
    })
};

export const getDb = async () => {
    console.log('GET from the database');

    // create connection to the IndexedDB database and the version we want to use
    const contactDb = await openDB('contact_db', 1);

    // create a new transaction and specify the store and data privileges
    const tx = contactDb.transaction('contacts', 'readonly');

    // open the desired object store
    const store = tx.objectStore('contacts');

    // use the .getAll() method to get all data in the database
    const request = store.getAll();

    // get confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result;
};

export const postDb = async (name, email, phone, profile) => {
    console.log('POST to the database');

    // create connection to the database and specify the version we want to use
    const contactDb = await openDB('contact_db', 1);

    // create a new transaction and specify the store and data privileges
    const tx = contactDb.transaction('contacts', 'readwrite');

    // open up the desired object store
    const store = tx.objectStore('contacts');

    // use the .add() method on the store and pass in the content
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });

    // get confirmation of the request
    const result = await request;
    console.log('Data saved to the database', result);
};

export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);

    // create connection to the IndexedDB database and the version we want to use
    const contactDb = await openDB('contact_db', 1);

    // create a new transaction and specify the store and data privileges
    const tx = contactDb.transaction('contacts', 'readwrite');

    // open up the desired object store
    const store = tx.objectStore('contacts');

    // use the .delete() method to get all data in the database
    const request = store.delete(id);

    // get confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result?.value;
};

export const editDb = async (id, name, email, phone, profile) => {
    console.log('PUT to the database', id);

    // create connection to the IndexedDB database and the version we want to use
    const contactDb = await openDB('contact_db', 1);

    // create a new transaction and specify the store and data privileges
    const tx = contactDb.transaction('contacts', 'readwrite');

    // open up the desired object store
    const store = tx.objectStore('contacts');

    // use the .delete() method to get all data in the database
    const request = store.put({ id: id, name: name, email: email, phone: phone, profile: profile });

    // get confirmation of the request
    const result = await request;
    console.log('Data saved to the database', result);
};