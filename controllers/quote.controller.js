const   database = require("../database/database")

class QuoteController {
    async getAll (request, response, next) {
        try {
            response.json(await database.crud("quote", "find"))
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async getSingle (request, response, next) {
        let {id} = request.params
        try {
            response.json(await database.crud("quote", "get", id))
        } catch (error) {
            response.status(404).json(error)
        }
    }

    async create (request, response, next) {
        let userQuote = request.body
        try {
            response.json(database.crud("quote", "create", userQuote))
        } catch (error) {
            response.status(500).json(error)
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
            if (error) response.status(500).json(error)
            else response.json(savedQuote)
        })
    }

    async remove (request, response, next) {
        let {id} = request.params
        try {
            var quote = database.crud("quote", "get", id)
        } catch (error) {
            response.status(404).json(error)
        }
        quote.remove((err,deletedQuote) => {
            if (err) response.status(500).json(err)
            else response.json(deletedQuote)
        })
    }
}

module.exports = new QuoteController()