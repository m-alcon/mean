import { Movie } from "./movie"
import { Quote } from "./quote";

export class Character {
    name: string
    actor: string
    movie: Movie
    quotes: Quote[]
    movie_id: number
    id: number
}