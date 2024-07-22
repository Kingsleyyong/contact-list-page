export interface CharacterTypes {
      id: number
      name: string
      status: string
      species: string
      type: string
      gender: string
      origin: {
            name: string
            url: string
      }
      location: {
            name: string
            url: string
      }
      image: string
      episode: string[]
      url: string
      created: string
}

export interface ExpisodeType {
      id: number
      name: string
      air_date: string
      episode: string
      characters: string[]
      url: string
      created: string
}

export interface PaginationType {
      currentPage: number
      totalPages: number
}

export enum CHARACTER_TABLE_HEADER {
      Name = 'name',
      Status = 'status',
      Species = 'species',
      Gender = 'gender',
}

export enum EPISODE_TABLE_HEADER {
      Name = 'name',
      Air_Date = 'air_date',
      Episode = 'episode',
}
