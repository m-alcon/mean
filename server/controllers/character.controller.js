const   database = require("../database/database")

class CharacterController {
    async getAll (request, response, next) {
        try {
            response.json(await database.crud("character", "find"))
        } catch (error) {
            response.json(error)
        }
    }

    async getSingle (request, response, next) {
        let {id} = request.params
        try {
            response.json(await database.crud("character", "get", id))
        } catch (error) {
            response.status(404).json(error)
        }
    }

    async create (request, response, next) {
        let userCharacter = request.body
        try {
            response.json(await database.crud("character", "create", userCharacter))
        } catch (error) {
            response.status(500).json(error)
        }
    }
    
    async update (request, response, next) {
        let {id} = request.params,
            userCharacter = request.body
        try {
            var character = await database.crud("character", "get", id)
        } catch (error) {
            response.status(404).json(error)
        }
        character.save(userCharacter,(error,savedMovie) => {
            if (error) response.status(500).json(error)
            else response.json(savedMovie)
        })
    }

    async remove (request, response, next) {
        let {id} = request.params
        try {
            var character = await database.crud("character", "get", id)
        } catch (error) {
            response.status(404).json(error)
        }
        character.remove((error,deletedMovie) => {
            if (error) response.status(500).json(error)
            else response.json(deletedMovie)
        })
    }
}

module.exports = new CharacterController()