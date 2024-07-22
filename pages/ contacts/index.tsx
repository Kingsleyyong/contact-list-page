import TableComponent from '@/components/TableComponents'
import { useFilterTables } from '@/hooks/useFilterTables'
import CharacterService from '@/services/CharacterService'
import { CharacterTypes } from '@/types/types'
import React, { useEffect, useRef, useState } from 'react'

const ContactsPage = () => {
      const searchInputRef = useRef<HTMLInputElement>(null)
      const [isLoading, setIsLoading] = useState(false)
      const [character, setCharacter] = useState<CharacterTypes[]>([])
      const [paginationInfo, setPaginationInfo] = useState([])

      const { tableHeader, tableRows } = useFilterTables(character)

      useEffect(() => {
            setIsLoading(true)

            const fetch = async () => {
                  try {
                        const data = await CharacterService.getAllCharacters()
                        setPaginationInfo(data.info)
                        setCharacter(data.results)
                        setIsLoading(false)
                  } catch (error) {
                        console.error('Error fetching user:', error)
                  }
            }

            fetch()
      }, [])

      useEffect(() => {
            console.log(tableRows)
      }, [tableRows])

      return (
            <div className={'min-w-full'}>
                  <h1>Contacts</h1>
                  <input
                        ref={searchInputRef}
                        type={'search'}
                        className={'ml-3 h-10 w-52'}
                        placeholder={'Search'}
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
