import { Game } from '../Game'

export interface GamesRepository {
  getGame(id: string): Promise<Game>

  getGames(ownerId: string): Promise<Game[]>

  createGame(game: Game): Promise<Game>
}
