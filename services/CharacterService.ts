const MAX_LIMIT = 20

const CharacterService = {
      getAllCharacters: async () => {
            try {
                  const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/character?_limit=${MAX_LIMIT}`
                  )

                  return await response.json()
            } catch (error) {
                  console.error('Error fetching users:', error)
                  throw error
            }
      },
}

export default CharacterService
