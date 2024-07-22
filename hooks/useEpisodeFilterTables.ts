import { EPISODE_TABLE_HEADER, ExpisodeType } from '@/types/types'
import { useEffect, useState } from 'react'

export const useEpisodeFilterTables = (episode: ExpisodeType[]) => {
      const [tableHeader, setTableHeader] = useState<string[]>([])
      const [tableRows, setTableRows] = useState<
            Record<EPISODE_TABLE_HEADER, string>[]
      >([])

      useEffect(() => {
            if (!episode || episode.length === 0) return

            console.log(episode)

            if (
                  Object.keys(EPISODE_TABLE_HEADER).every((key) =>
                        episode.every((object) =>
                              Object.keys(object).includes(
                                    EPISODE_TABLE_HEADER[
                                          key as keyof typeof EPISODE_TABLE_HEADER
                                    ]
                              )
                        )
                  )
            ) {
                  setTableHeader(Object.keys(EPISODE_TABLE_HEADER))
            }
      }, [episode])

      useEffect(() => {
            if (tableHeader.length === 0) return

            console.log(tableHeader)
            const rowDatas = episode.reduce(
                  (
                        accumulator: Record<EPISODE_TABLE_HEADER, string>[],
                        currRow
                  ) => {
                        const row: Record<EPISODE_TABLE_HEADER, string> =
                              tableHeader.reduce(
                                    (rowAccumulator, key) => {
                                          const enumValue =
                                                EPISODE_TABLE_HEADER[
                                                      key as keyof typeof EPISODE_TABLE_HEADER
                                                ]

                                          console.log(enumValue, currRow)

                                          rowAccumulator[enumValue] =
                                                currRow[enumValue]

                                          return rowAccumulator
                                    },
                                    {} as Record<EPISODE_TABLE_HEADER, string>
                              )

                        accumulator.push(row)
                        return accumulator
                  },
                  []
            )

            setTableRows(rowDatas)
      }, [episode, tableHeader])

      return { tableHeader, tableRows }
}
