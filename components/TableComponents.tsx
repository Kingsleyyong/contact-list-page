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
      currentPage?: number
      totalPages?: number
      paginationCallback?: (right: boolean) => void
}

const TableComponent = ({
      tableHeaders,
      tableBodyData,
      currentPage,
      totalPages,
      paginationCallback,
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
                        {tableBodyData.map((row, rowIndex) => (
                              <tr
                                    key={`DataRow ${rowIndex}`}
                                    onClick={() => {
                                          if (!Object.keys(row).includes('id'))
                                                return

                                          onRowClick((row as CharacterTypes).id)
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
                                                row[enumKey as keyof typeof row]

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
                                                                  {cellData}
                                                            </span>
                                                      }
                                                </td>
                                          )
                                    })}
                              </tr>
                        ))}

                        {/* Pagination */}
                        {currentPage && totalPages && paginationCallback && (
                              <tr className={'hover:bg-gray-50/0'}>
                                    <td
                                          colSpan={
                                                Object.keys(
                                                      tableBodyData[0] ?? {}
                                                ).length
                                          }
                                    >
                                          <button
                                                disabled={currentPage === 1}
                                                className={'my-2 mr-5'}
                                                onClick={() =>
                                                      paginationCallback(false)
                                                }
                                          >
                                                ←
                                          </button>
                                          {currentPage - 2 > 1 && (
                                                <span className={'ml-3'}>
                                                      ...
                                                </span>
                                          )}

                                          {Array.from(
                                                {
                                                      length: 5,
                                                },
                                                (_, index) =>
                                                      (currentPage - 2 < 0
                                                            ? 1
                                                            : currentPage - 2) +
                                                      index
                                          )
                                                .filter(
                                                      (number) =>
                                                            number > 0 &&
                                                            number < totalPages
                                                )
                                                .map((number) => (
                                                      <span
                                                            className={`${currentPage === number && 'text-xl font-extrabold'} m-1`}
                                                            key={number}
                                                      >
                                                            {number}
                                                      </span>
                                                ))}

                                          {currentPage + 2 < totalPages && (
                                                <span className={'mr-3 pt-3'}>
                                                      ...
                                                </span>
                                          )}
                                          <button
                                                disabled={
                                                      currentPage === totalPages
                                                }
                                                className={'my-2 ml-5'}
                                                onClick={() =>
                                                      paginationCallback(true)
                                                }
                                          >
                                                →
                                          </button>
                                    </td>
                              </tr>
                        )}
                  </tbody>
            </table>
      )
}

export default TableComponent
