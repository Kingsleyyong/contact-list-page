import { CharacterTypes, CHARACTER_TABLE_HEADER } from '@/types/types'
import { useEffect, useState } from 'react'

export const useCharacterFilterTables = (character: CharacterTypes[]) => {
      const [tableHeader, setTableHeader] = useState<string[]>([])
      const [tableRows, setTableRows] = useState<
            Record<CHARACTER_TABLE_HEADER, string>[]
      >([])

      useEffect(() => {
            if (!character || character.length === 0) return
            if (
                  Object.keys(CHARACTER_TABLE_HEADER).every((key) =>
                        character.every((object) =>
                              Object.keys(object).includes(
                                    CHARACTER_TABLE_HEADER[
                                          key as keyof typeof CHARACTER_TABLE_HEADER
                                    ]
                              )
                        )
                  )
            ) {
                  setTableHeader(Object.keys(CHARACTER_TABLE_HEADER))
            }
      }, [character])

      useEffect(() => {
            if (tableHeader.length === 0 || !character) return
            const rowDatas = character.reduce(
                  (
                        accumulator: Record<CHARACTER_TABLE_HEADER, string>[],
                        currRow
                  ) => {
                        const row: Record<CHARACTER_TABLE_HEADER, string> =
                              tableHeader.reduce(
                                    (rowAccumulator, key) => {
                                          const enumValue =
                                                CHARACTER_TABLE_HEADER[
                                                      key as keyof typeof CHARACTER_TABLE_HEADER
                                                ]

                                          rowAccumulator[enumValue] =
                                                currRow[enumValue]

                                          return {
                                                ...rowAccumulator,
                                                id: currRow.id,
                                          }
                                    },
                                    {} as Record<CHARACTER_TABLE_HEADER, string>
                              )

                        accumulator.push(row)
                        return accumulator
                  },
                  []
            )

            setTableRows(rowDatas)
      }, [character, tableHeader])

      return { tableHeader, tableRows }
}
