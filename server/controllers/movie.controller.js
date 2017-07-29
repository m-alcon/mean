const   database = require("../database/database")
        httpResponse = require ("../utils/http-response"),
        modelManager = require ("../utils/model-manager")

class MovieController {
    async getAll (request, response, next) {
        try {
            let find = await database.crud("movie", "find")
            httpResponse.ok(response, find)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }

    async getSingle (request, response, next) {
        let {id} = request.params
        try {
           let get = await database.crud("movie", "get", id)
           httpResponse.ok(response, get)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
    }

    async create (request, response, next) {
        let userMovie = request.body
        try {
            let create = await database.crud("movie", "create", userMovie)
            httpResponse.ok(response, create)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }
    
    async update (request, response, next) {
        let {id} = request.params,
            userMovie = request.body,
            movie
        try {
            movie = await database.crud("movie", "get", id)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
        let save = modelManager.promisify(movie,userMovie)
        try {
            await save()
            httpResponse.ok(response)
        } catch (error) {
            if (error.type == "validation" || error.code == "ER_BAD_FIELD_ERROR") 
                httpResponse.badRequest(response, error)
            else httpResponse.error(response, error)
        }
    }

    async remove (request, response, next) {
        let {id} = request.params,
            movie
        try {
            movie = await database.crud("movie", "get", id)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
       let rmv = modelManager.remove(movie)
        try {
            let deletedMovie = await rmv()
            httpResponse.ok(response, deletedMovie)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }
}

module.exports = new MovieController()