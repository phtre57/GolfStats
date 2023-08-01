import { Game } from '../Game'

export interface GamesRepository {
  getGame(ownerId: string, id: string): Promise<Game>

  getGames(ownerId: string): Promise<Game[]>

  createGame(game: Game): Promise<Game>

  updateGame(game: Game): Promise<Game>
}
