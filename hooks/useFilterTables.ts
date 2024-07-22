import TableComponent from '@/components/TableComponents'
import { CharacterTypes, TABLE_HEADER } from '@/types/types'
import { useEffect, useState } from 'react'

export const useFilterTables = (character: CharacterTypes[]) => {
      const [tableHeader, setTableHeader] = useState<string[]>([])
      const [tableRows, setTableRows] = useState<
            Record<TABLE_HEADER, string>[]
      >([])

      useEffect(() => {
            if (
                  Object.keys(TABLE_HEADER).every((key) =>
                        character.every((object) =>
                              Object.keys(object).includes(key)
                        )
                  )
            ) {
                  setTableHeader(Object.keys(TABLE_HEADER))
            }
      }, [character])

      useEffect(() => {
            if (tableHeader.length === 0) return

            const rowDatas = character.reduce(
                  (accumulator: Record<TABLE_HEADER, string>[], currRow) => {
                        const row: Record<TABLE_HEADER, string> =
                              tableHeader.reduce(
                                    (rowAccumulator, key) => {
                                          const enumValue =
                                                TABLE_HEADER[
                                                      key as keyof typeof TABLE_HEADER
                                                ]

                                          rowAccumulator[enumValue] =
                                                currRow[enumValue]

                                          return rowAccumulator
                                    },
                                    {} as Record<TABLE_HEADER, string>
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
