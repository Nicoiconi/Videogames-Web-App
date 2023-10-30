import { openDB } from 'idb'

const dbPromise = openDB('video_games_db', 1, {
  upgrade(db) {
    db.createObjectStore('video_games_store', { keyPath: 'apiId' })
  }
})

function generateRandomId(length) {
  let randomId = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export const addData = async (data) => {
  const db = await dbPromise
  const tx = db.transaction('video_games_store', 'readwrite')
  const store = tx.objectStore('video_games_store')
  if (data.apiId) {
    const existingData = await store.get(data.apiId)
    if (!existingData) {
      await store.add(data)
      return true
    } else {
      return "Already created"
    }
  } else {
    const randomId = generateRandomId(10)
    await store.add({...data, apiId: randomId})
  }
}

export const getAllData = async () => {
  const db = await dbPromise
  const tx = db.transaction('video_games_store', 'readonly')
  const store = tx.objectStore('video_games_store')
  return store.getAll()
}

export const deleteData = async (id) => {
  const db = await dbPromise
  const tx = db.transaction('video_games_store', 'readwrite')
  const store = tx.objectStore('video_games_store')
  await store.delete(id)
  await tx.done
}