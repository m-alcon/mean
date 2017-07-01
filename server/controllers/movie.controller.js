const   database = require("../database/database")

class MovieController {
    async getAll (request, response, next) {
        try {
            response.json(await database.crud("movie", "find"))
        } catch (error) {
            response.json(error)
        }
    }

    async getSingle (request, response, next) {
        let {id} = request.params
        try {
            response.json(await database.crud("movie", "get", id))
        } catch (error) {
            response.status(404).json(error)
        }
    }

    async create (request, response, next) {
        let userMovie = request.body
        try {
            response.json(await database.crud("movie", "create", userMovie))
        } catch (error) {
            response.status(500).json(error)
        }
    }
    
    async update (request, response, next) {
        let {id} = request.params,
            userMovie = request.body
        try {
            var movie = await database.crud("movie", "get", id)
        } catch (error) {
            response.status(404).json(error)
        }
        movie.save(userMovie,(error,savedMovie) => {
            if (error) response.status(500).json(error)
            else response.json(savedMovie)
        })
    }

    async remove (request, response, next) {
        let {id} = request.params
        try {
            var movie = await database.crud("movie", "get", id)
        } catch (error) {
            response.status(404).json(error)
        }
        movie.remove((error,deletedMovie) => {
            if (error) response.status(500).json(error)
            else response.json(deletedMovie)
        })
    }
}

module.exports = new MovieController()