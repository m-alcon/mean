const   database = require("../database/database"),
        httpResponse = require ("../utils/http-response"),
        modelManager = require ("../utils/model-manager")

class CategoryController {
    async getAll (request, response, next) {
        try {
            let find = await database.crud("category", "find")
            httpResponse.ok(response, find)
        } catch (error) {
            response.json(error)
        }
    }

    async getSingle (request, response, next) {
        let {id} = request.params
        try {
            let get = await database.crud("category", "get", id)
            httpResponse.ok(response, get)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
    }

    async create (request, response, next) {
        let userCategory = request.body
        try {
            let create = await database.crud("category", "create", userCategory)
            httpResponse.ok(response, create)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }
    
    async update (request, response, next) {
        let {id} = request.params,
            userCategory = request.body,
            category
        try {
            category = await database.crud("category", "get", id)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
        let save = modelManager.save(category,userCategory)
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
            category
        try {
            category = await database.crud("category", "get", id)
        } catch (error) {
            httpResponse.notFound(response, error)
        }
        let rmv = modelManager.remove(category)
        try {
            let deletedCategory = await rmv()
            httpResponse.ok(response, deletedCategory)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }
}

module.exports = new CategoryController()