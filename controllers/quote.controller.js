const   database = require("../database/database")

class QuoteController {
    getAll (request, response, next) {
        database.db.models.quote.find({}, (err,quotes) => {
            if (err) response.status(500).json(err)
            else response.json(quotes)
        })
    }

    getSingle (request, response, next) {
        let {id} = request.params
        database.db.models.quote.get(id, (err,quote) => {
            if (err) response.status(404).json(err)
            else response.json(quote)
        })
    }

    create (request, response, next) {
        let userQuote = request.body
        database.db.models.quote.create(userQuote, (err,quote) => {
            if (err) response.status(500).json(err)
            else response.json(quote)
        })
    }
    
    update (request, response, next) {
        let {id} = request.params,
            userQuote = request.body
        database.db.models.quote.get(id, (err,quote) => {
            if (err) response.status(404).json(err)
            else {
                quote.save(userQuote,(err,savedQuote) => {
                    if (err) response.status(500).json(err)
                    else response.json(savedQuote)
                })
            }
        })
    }

    remove (request, response, next) {
        let {id} = request.params
        database.db.models.quote.get(id, (err,quote) => {
            if (err) response.status(404).json(err)
            else {
                quote.remove((err,deletedQuote) => {
                    if (err) response.status(500).json(err)
                    else response.json(deletedQuote)
                })
            }
        })
    }
}

module.exports = new QuoteController()