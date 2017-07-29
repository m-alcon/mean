const   database = require("../database/database"),
        httpResponse = require ("../utils/http-response"),
        modelManager = require ("../utils/model-manager")

class CharacterController {
    async getAll (request, response, next) {
        try {
            let find = await database.crud("character", "find")
            httpResponse.ok(response, find)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }

    async getSingle (request, response, next) {
        let {id} = request.params
        try {
            let get = await database.crud("character", "get", id)
            httpResponse.ok(response, get)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
    }

    async create (request, response, next) {
        let userCharacter = request.body
        try {
            let create = await database.crud("character", "create", userCharacter)
            httpResponse.ok(response, create)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }
    
    async update (request, response, next) {
        let {id} = request.params,
            userCharacter = request.body,
            character
        try {
            character = await database.crud("character", "get", id)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
        let save = modelManager.save(character,userCharacter)
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
            character
        try {
            character = await database.crud("character", "get", id)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
        let rmv = modelManager.remove(character)
        try {
            let deletedCharacter = await rmv()
            httpResponse.ok(response, deletedCharacter)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }
}

module.exports = new CharacterController()