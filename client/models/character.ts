import { Movie } from "./movie"
import { Quote } from "./quote";

export class Character {
    name: string
    actor: string
    movie: Movie
    quotes: Quote[]
}