const   database = require ("../database/database"),
        httpResponse = require ("../utils/http-response"),
        modelManager = require ("../utils/model-manager")

class QuoteController {
    async getAll (request, response, next) {
        let categoryId = request.query.categoryid,
            characterId = request.query.characterId,
            where = {}
        if (categoryId) where.category_id = categoryId
        if (characterId) where.character_id = characterId        
        try {
            let quotes = await database.crud("quote", "find", where)
            if (!quotes.length)
                httpResponse.notFound(response)
            else  httpResponse.ok(response, quotes)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }

    async getSingle (request, response, next) {
        let {id} = request.params
        try {
            let quote = await database.crud("quote", "get", id)
            if (!quote) httpResponse.notFound(response)
            else httpResponse.ok(response, quote)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }

    async create (request, response, next) {
        let userQuote = request.body
        delete userQuote.id
        delete userQuote.category
        delete userQuote.character
        try {
            let create = await database.crud("quote", "create", userQuote)
            httpResponse.ok(response, create)
        } catch (error) {
            if (error.type == "validation" || error.code == "ER_BAD_FIELD_ERROR") 
                httpResponse.badRequest(response, error)
            else httpResponse.error(response, error)
        }
    }
    
    async update (request, response, next) {
        let {id} = request.params,
            userQuote = request.body,
            quote
        delete userQuote.id
        delete userQuote.category
        delete userQuote.character
        try {
            quote = await database.crud("quote", "get", id)
        } catch (error) {
            httpResponse.notFound(response, error)
        }

        let save = modelManager.save(quote,userQuote)
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
            quote
        try {
            quote = database.crud("quote", "get", id)
        } catch (error) {
            if (error.type == "validation" || error.code == "ER_BAD_FIELD_ERROR") 
                httpResponse.badRequest(response, error)
            else httpResponse.error(response, error)
        }
        let rmv = modelManager.remove(quote)
        try {
            let deletedQuote = await rmv()
            httpResponse.ok(response, deletedQuote)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }
}

module.exports = new QuoteController()