import { Game } from '../Game'

export interface GamesRepository {
  getGame(id: string): Promise<Game>

  getGames(): Promise<Game[]>

  createGame(game: Game): Promise<Game>
}
