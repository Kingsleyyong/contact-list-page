import { TABLE_HEADER } from '@/types/types'

interface TableComponentProps {
      tableHeaders: string[]
      tableBodyData: Record<TABLE_HEADER, string>[]
      // startIndex: number
      // endIndex: number
}

const TableComponent = ({
      tableHeaders,
      tableBodyData,
      // startIndex,
      // endIndex,
}: TableComponentProps) => {
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
                                    <tr key={`DataRow ${rowIndex}`}>
                                          {tableHeaders.map((key) => {
                                                console.log(key, row)
                                                const cellData =
                                                      row[
                                                            TABLE_HEADER[
                                                                  key as keyof typeof TABLE_HEADER
                                                            ]
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
