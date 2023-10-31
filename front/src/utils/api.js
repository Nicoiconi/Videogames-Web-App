const apiKey = import.meta.env.VITE_API_KEY

export const getVideogames = async (size) => {
  try {
    let response
    if (size > 0) {
      response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=${size}`)
    } else {
      response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
    }

    if (!response?.ok) {
      throw new Error(`Error status: ${response?.status}`)
    }

    const data = await response?.json()

    const videoGameFormat = data?.results?.map(vg => {
      return {
        apiId: vg?.id,
        name: vg?.name,
        image: vg?.background_image,
        rating: Math.round(vg?.rating),
        genres: vg?.genres.map((g) => g?.name),
        platforms: vg?.platforms.map((p) => p?.platform?.name),
      }
    })

    return videoGameFormat
  } catch (error) {
    console.log(error)
  }
}

export const getSingleVideoGame = async (apiId) => {
  try {

    const singleVideoGame = await fetch(`https://api.rawg.io/api/games/${apiId}?key=${apiKey}`)

    if(!singleVideoGame?.ok){
      throw new Error(`Error status: ${singleVideoGame?.status}`)
    }

    const data = await singleVideoGame?.json()

    // console.log(data)

    return data

  } catch (error) {
    console.log(error)
  }
}