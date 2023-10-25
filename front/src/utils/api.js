const apiKey = import.meta.env.VITE_API_KEY

export const getVideogames = async () => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)

    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`)
    }

    const data = await response.json()

    const videoGameFormat = data.results.map(vg => {
      return {
        apiId: vg.id,
        name: vg.name,
        image: vg.background_image,
        rating: Math.round(vg.rating),
        genres: vg.genres.map((g) => g.name),
        platforms: vg.platforms.map((p) => p.platform.name),
      }
    })

    return videoGameFormat
  } catch (error) {
    console.log(error)
  }
}