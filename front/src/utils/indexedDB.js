import { openDB } from 'idb'

const dbPromise = openDB('video_games_db', 1, {
  upgrade(db) {
db.createObjectStore('video_games_store', {keyPath: 'apiId'})
  }
})

export const addData = async (data) => {
  const db = await dbPromise
  const tx = db.transaction('video_games_store', 'readwrite')
  const store = tx.objectStore('video_games_store')
  await store.add(data)
  await tx.done
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