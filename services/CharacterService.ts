const MAX_LIMIT = 20

const CharacterService = {
      getCharacterById: async (id: number) => {
            try {
                  const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/character/${id}`
                  )

                  return await response.json()
            } catch (error) {
                  console.error('Error fetching users:', error)
                  throw error
            }
      },
      getCharacterByName: async (name: string) => {
            try {
                  const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/character/?name=${name}`
                  )

                  return await response.json()
            } catch (error) {
                  console.error('Error fetching users:', error)
                  throw error
            }
      },
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
