import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CharacterService from '@/services/CharacterService'
import { CharacterTypes, ExpisodeType } from '@/types/types'
import Image from 'next/image'
import TableComponent from '@/components/TableComponents'
import { useEpisodeFilterTables } from '@/hooks/useEpisodeFilterTables'
import EpisodesService from '@/services/EpisodesService'

const IndividualContactPage = () => {
      const router = useRouter()
      const [isLoading, setIsLoading] = useState(false)
      const [characterData, setCharacterData] = useState<CharacterTypes>()
      const [characterEpisodeData, setCharacterEpisodeData] = useState<
            ExpisodeType[]
      >([])

      const { tableHeader, tableRows } =
            useEpisodeFilterTables(characterEpisodeData)

      useEffect(() => {
            setIsLoading(true)
            const id = parseInt(router.query.id as string, 10)
            if (id === undefined || isNaN(id)) return

            const fetching = async () => {
                  try {
                        await CharacterService.getCharacterById(id).then(
                              async (data) => {
                                    setCharacterData(data)

                                    const episodeData =
                                          await EpisodesService.getEpisodeByCharacter(
                                                data.name
                                          )

                                    setCharacterEpisodeData(episodeData.results)
                                    setIsLoading(false)
                              }
                        )
                  } catch (error) {
                        console.error('Error fetching user:', error)
                  }
            }

            fetching()
      }, [router.query.id])

      return (
            <div className='flex min-h-screen flex-col'>
                  {characterData && !isLoading && (
                        <Fragment>
                              <div className='flex h-1/3 grow-0 items-center bg-gray-500 p-4'>
                                    <div
                                          className={
                                                'ml-20 flex size-40 items-center justify-center rounded-full'
                                          }
                                    >
                                          <Image
                                                priority={false}
                                                src={characterData?.image}
                                                alt={`${characterData?.name} Image`}
                                                width={400}
                                                height={400}
                                          />
                                    </div>

                                    <h1 className={'ml-8 text-5xl'}>
                                          {characterData.name}
                                    </h1>
                              </div>

                              <div className={'px-32 py-5'}>
                                    <h2>Personal Info</h2>

                                    <div
                                          className={
                                                'w-full rounded-md border border-solid border-gray-700 p-3 dark:border-gray-300'
                                          }
                                    >
                                          <ol>
                                                <li>
                                                      Status:{' '}
                                                      {characterData.status}
                                                </li>
                                                <li>
                                                      Gender:{' '}
                                                      {characterData.gender}
                                                </li>
                                                <li>
                                                      Location:{' '}
                                                      {
                                                            characterData
                                                                  .location.name
                                                      }
                                                </li>
                                                <li>
                                                      Origin:{' '}
                                                      {
                                                            characterData.origin
                                                                  .name
                                                      }
                                                </li>
                                                <li>
                                                      Species:{' '}
                                                      {characterData.species}
                                                </li>
                                          </ol>
                                    </div>
                              </div>

                              <div className={'px-32 py-5'}>
                                    <h2>Episodes</h2>

                                    <div
                                          className={
                                                'w-full rounded-md border border-solid border-gray-700 p-3 dark:border-gray-300'
                                          }
                                    >
                                          <TableComponent
                                                tableHeaders={tableHeader}
                                                tableBodyData={tableRows}
                                          />
                                    </div>
                              </div>
                        </Fragment>
                  )}
            </div>
      )
}

export default IndividualContactPage
