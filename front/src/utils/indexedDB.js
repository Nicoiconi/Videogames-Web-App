import { openDB } from 'idb'

const dbPromise = openDB('video_games_db', 1, {
  upgrade(db) {
    db.createObjectStore('video_games_store', { keyPath: 'apiId' })
  }
})

export const addData = async (data) => {
  const db = await dbPromise
  const tx = db.transaction('video_games_store', 'readwrite')
  const store = tx.objectStore('video_games_store')
  const allVideoGames = await store.getAll()

  const existingData = await store.get(data.apiId)
  if (existingData) {
    return "Already created"
  } else {
    const existingName = allVideoGames.filter(vg => vg.name.toLowerCase() === data.name.toLowerCase())
    if (existingName?.length > 0) {
      return "Name already exist"
    } else {
      await store.add(data)
      return "Video game created"
    }
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
  return "Video game deleted"
}