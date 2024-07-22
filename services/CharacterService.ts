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
      getPageCharacters: async (page: number) => {
            try {
                  const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/character/?page=${page}`
                  )

                  return await response.json()
            } catch (error) {
                  console.error('Error fetching users:', error)
                  throw error
            }
      },
}

export default CharacterService
