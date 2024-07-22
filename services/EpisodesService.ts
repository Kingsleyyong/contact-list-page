const EpisodesService = {
      getEpisodeByCharacter: async (characterName: string) => {
            try {
                  const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/episode/?character=${characterName}`
                  )

                  return await response.json()
            } catch (error) {
                  console.error('Error fetching users:', error)
                  throw error
            }
      },
}

export default EpisodesService
