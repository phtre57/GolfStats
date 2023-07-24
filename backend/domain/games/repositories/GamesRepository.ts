import { ComputedStatistics } from 'domain/stats'

import { Game } from '../Game'

export interface GamesRepository {
  getGame(id: string): Promise<Game>

  getGames(): Promise<Game[]>

  createGame(game: Game, stats: ComputedStatistics): Promise<void>
}
