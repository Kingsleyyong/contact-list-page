import Loading from '@/components/Loading'
import SEO from '@/components/SEO'
import TableComponent from '@/components/TableComponents'
import { useCharacterFilterTables } from '@/hooks/useCharacterFilterTables'
import CharacterService from '@/services/CharacterService'
import { CharacterTypes, PaginationType } from '@/types/types'
import debounce from '@/utils/debounce'
import { useRouter } from 'next/router'
import React, {
      Fragment,
      useCallback,
      useEffect,
      useRef,
      useState,
} from 'react'

const ContactsPage = () => {
      const router = useRouter()
      const currentPage = parseInt((router.query.page as string) ?? '1', 10)
      const [isLoading, setIsLoading] = useState(false)
      const [character, setCharacter] = useState<CharacterTypes[]>([])
      const [paginationInfo, setPaginationInfo] = useState<PaginationType>()

      const { tableHeader, tableRows } = useCharacterFilterTables(character)

      const fetching = debounce(async (page: number, searchInput?: string) => {
            try {
                  let data
                  if (searchInput) {
                        data =
                              await CharacterService.getCharacterByName(
                                    searchInput
                              )
                  } else data = await CharacterService.getPageCharacters(page)

                  setPaginationInfo({
                        currentPage: page,
                        totalPages: data.info.pages,
                  })
                  setCharacter(data.results)
                  setIsLoading(false)
            } catch (error) {
                  console.error('Error fetching user:', error)
            }
      }, 1000)

      useEffect(() => {
            setIsLoading(true)
            fetching(currentPage)
      }, [])

      const searchInputChange = (
            event: React.ChangeEvent<HTMLInputElement>
      ) => {
            setIsLoading(true)
            const currentInput = event.target.value
            fetching(currentPage, currentInput)
      }

      const paginationCallback = useCallback(
            (right: boolean) => {
                  if (paginationInfo?.totalPages === undefined) return

                  if (right && currentPage <= paginationInfo.totalPages) {
                        setIsLoading(true)
                        router.push(`/?page=${currentPage + 1}`)
                        fetching(currentPage + 1)
                  } else if (currentPage !== 1) {
                        setIsLoading(true)
                        router.push(`/?page=${currentPage - 1}`)
                        fetching(currentPage - 1)
                  }
            },
            [currentPage, fetching, paginationInfo?.totalPages, router]
      )

      return (
            <Fragment>
                  <SEO
                        title={'Contact List - SleekFlow'}
                        description={
                              'View our list of contacts with their related information.'
                        }
                  />

                  <div className={'min-w-full'}>
                        <h1>Contacts</h1>
                        <input
                              type={'search'}
                              className={'ml-3 h-10 w-52'}
                              placeholder={'Search'}
                              onChange={searchInputChange}
                        />

                        <hr />

                        {isLoading && <Loading />}

                        {!isLoading && (
                              <TableComponent
                                    tableHeaders={tableHeader}
                                    tableBodyData={tableRows}
                                    currentPage={paginationInfo?.currentPage}
                                    totalPages={paginationInfo?.totalPages}
                                    paginationCallback={paginationCallback}
                              />
                        )}
                  </div>
            </Fragment>
      )
}

export default ContactsPage
