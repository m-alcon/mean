const   database = require ("../database/database"),
        httpResponse = require ("../utils/http-response")

class QuoteController {
    async getAll (request, response, next) {
        let categoryId = request.query.categoryid,
            characterId = request.query.characterId,
            where = {}
        if (categoryId) where.category_id = categoryId
        if (characterId) where.character_id = characterId        
        try {
            let quotes = response.json(await 
                database.crud("quote", "find", where))
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
        try {
            httpResponse.ok(response, 
                await database.crud("quote", "create", userQuote))
        } catch (error) {
            if (error.type == "validation" || error.code == "ER_BAD_FIELD_ERROR") 
                httpResponse.badRequest(response, error)
            else httpResponse.error(response, error)
        }
    }
    
    async update (request, response, next) {
        let {id} = request.params,
            userQuote = request.body
        try {
            var quote = await database.crud("quote", "get", id)
        } catch (error) {
            response.status(404).json(error)
        }
        quote.save(userQuote,(error, savedQuote) => {
            if (error) {
                if (error.type == "validation" || error.code == "ER_BAD_FIELD_ERROR") 
                    httpResponse.badRequest(response, error)
                else httpResponse.error(response, error)
            }
            else httpResponse.ok(response, savedQuote)
        })
    }

    async remove (request, response, next) {
        let {id} = request.params
        try {
            var quote = database.crud("quote", "get", id)
        } catch (error) {
            if (error.type == "validation" || error.code == "ER_BAD_FIELD_ERROR") 
                httpResponse.badRequest(response, error)
            else httpResponse.error(response, error)
        }
        quote.remove((err,deletedQuote) => {
            if (err) response.status(500).json(err)
            else response.json(deletedQuote)
        })
    }
}

module.exports = new QuoteController()