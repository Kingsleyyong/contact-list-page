import {
      CHARACTER_TABLE_HEADER,
      CharacterTypes,
      EPISODE_TABLE_HEADER,
} from '@/types/types'
import { useRouter } from 'next/router'

interface TableComponentProps {
      tableHeaders: string[]
      tableBodyData:
            | Record<CHARACTER_TABLE_HEADER, string>[]
            | Record<EPISODE_TABLE_HEADER, string>[]
      // startIndex: number
      // endIndex: number
}

const TableComponent = ({
      tableHeaders,
      tableBodyData,
      // startIndex,
      // endIndex,
}: TableComponentProps) => {
      const router = useRouter()
      const onRowClick = (id: number) => {
            router.push(`/individualContactPage/${id}`)
      }
      return (
            <table className={'mx-5 w-[97%] grow'}>
                  <thead>
                        <tr>
                              {tableHeaders.map((str, index) => (
                                    <td key={`Header ${index}. ${str}`}>
                                          <span
                                                className={
                                                      'pointer-events-none select-none font-bold uppercase'
                                                }
                                          >
                                                {str.replace(
                                                      /([a-z0-9])([A-Z])/g,
                                                      '$1 $2'
                                                )}
                                          </span>
                                    </td>
                              ))}
                        </tr>
                  </thead>

                  <tbody>
                        {tableBodyData
                              // .filter(
                              //       (_, index) =>
                              //             index >= startIndex &&
                              //             index < endIndex
                              // )
                              .map((row, rowIndex) => (
                                    <tr
                                          key={`DataRow ${rowIndex}`}
                                          onClick={() => {
                                                if (
                                                      !Object.keys(
                                                            row
                                                      ).includes('id')
                                                )
                                                      return

                                                onRowClick(
                                                      (row as CharacterTypes).id
                                                )
                                          }}
                                    >
                                          {tableHeaders.map((key) => {
                                                const enumKey = Object.keys(
                                                      CHARACTER_TABLE_HEADER
                                                ).includes(key)
                                                      ? CHARACTER_TABLE_HEADER[
                                                              key as keyof typeof CHARACTER_TABLE_HEADER
                                                        ]
                                                      : EPISODE_TABLE_HEADER[
                                                              key as keyof typeof EPISODE_TABLE_HEADER
                                                        ]

                                                const cellData =
                                                      row[
                                                            enumKey as keyof typeof row
                                                      ]

                                                return (
                                                      <td
                                                            key={`Row ${rowIndex}, ${key}`}
                                                            className={'h-12'}
                                                      >
                                                            {
                                                                  <span
                                                                        className={
                                                                              'pointer-events-none select-none normal-case'
                                                                        }
                                                                  >
                                                                        {
                                                                              cellData
                                                                        }
                                                                  </span>
                                                            }
                                                      </td>
                                                )
                                          })}
                                    </tr>
                              ))}
                  </tbody>
            </table>
      )
}

export default TableComponent
