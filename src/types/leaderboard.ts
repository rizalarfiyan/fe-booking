export interface ICurrentRank {
  userId: number
  points: number
  bookCount: number
  ranking: number
}

export interface ILeaderboard {
  userId: number
  points: number
  bookCount: number
  firstName: string
  lastName: string
  email: string
  avatar?: string
}
