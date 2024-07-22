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

export enum TABLE_HEADER {
      Name = 'name',
      Status = 'status',
      Species = 'species',
      Gender = 'gender',
}
