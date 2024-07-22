import TableComponent from '@/components/TableComponents'
import { useCharacterFilterTables } from '@/hooks/useCharacterFilterTables'
import CharacterService from '@/services/CharacterService'
import { CharacterTypes } from '@/types/types'
import debounce from '@/utils/debounce'
import React, { useEffect, useRef, useState } from 'react'

const ContactsPage = () => {
      const [isLoading, setIsLoading] = useState(false)
      const [character, setCharacter] = useState<CharacterTypes[]>([])
      const [paginationInfo, setPaginationInfo] = useState([])

      const { tableHeader, tableRows } = useCharacterFilterTables(character)

      const fetching = debounce(async (searchInput?: string) => {
            try {
                  let data
                  if (searchInput) {
                        data =
                              await CharacterService.getCharacterByName(
                                    searchInput
                              )
                  } else data = await CharacterService.getAllCharacters()

                  setPaginationInfo(data.info)
                  setCharacter(data.results)
                  setIsLoading(false)
            } catch (error) {
                  console.error('Error fetching user:', error)
            }
      }, 1000)

      useEffect(() => {
            setIsLoading(true)
            fetching()
      }, [])

      const searchInputChange = (
            event: React.ChangeEvent<HTMLInputElement>
      ) => {
            setIsLoading(true)
            const currentInput = event.target.value
            fetching(currentInput)
      }

      return (
            <div className={'min-w-full'}>
                  <h1>Contacts</h1>
                  <input
                        type={'search'}
                        className={'ml-3 h-10 w-52'}
                        placeholder={'Search'}
                        onChange={searchInputChange}
                  />

                  <hr />

                  {!isLoading && (
                        <TableComponent
                              tableHeaders={tableHeader}
                              tableBodyData={tableRows}
                        />
                  )}
            </div>
      )
}

export default ContactsPage
