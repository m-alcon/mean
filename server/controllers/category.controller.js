const   database = require("../database/database")

class CategoryController {
    async getAll (request, response, next) {
        try {
            response.json(await database.crud("category", "find"))
        } catch (error) {
            response.json(error)
        }
    }

    async getSingle (request, response, next) {
        let {id} = request.params
        try {
            response.json(await database.crud("category", "get", id))
        } catch (error) {
            response.status(404).json(error)
        }
    }

    async create (request, response, next) {
        let userCategory = request.body
        try {
            response.json(await database.crud("category", "create", userCategory))
        } catch (error) {
            response.status(500).json(error)
        }
    }
    
    async update (request, response, next) {
        let {id} = request.params,
            userCategory = request.body
        try {
            var category = await database.crud("category", "get", id)
        } catch (error) {
            response.status(404).json(error)
        }
        category.save(userCategory,(error,savedMovie) => {
            if (error) response.status(500).json(error)
            else response.json(savedMovie)
        })
    }

    async remove (request, response, next) {
        let {id} = request.params
        try {
            var category = await database.crud("category", "get", id)
        } catch (error) {
            response.status(404).json(error)
        }
        category.remove((error,deletedMovie) => {
            if (error) response.status(500).json(error)
            else response.json(deletedMovie)
        })
    }
}

module.exports = new CategoryController()