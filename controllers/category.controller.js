const   database = require("../database/database")

class CategoryController {
    getAll (request, response, next) {
        database.db.models.category.find({}, (err,categories) => {
            if (err) response.status(500).json(err)
            else response.json(categories)
        })
    }

    getSingle (request, response, next) {
        let {id} = request.params
        database.db.models.category.get(id, (err,category) => {
            if (err) response.status(404).json(err)
            else response.json(category)
        })
    }

    create (request, response, next) {
        let userCategory = request.body
        database.db.models.category.create(userCategory, (err,category) => {
            if (err) response.status(500).json(err)
            else response.json(category)
        })
    }
    
    update (request, response, next) {
        let {id} = request.params,
            userCategory = request.body
        database.db.models.category.get(id, (err,category) => {
            if (err) response.status(404).json(err)
            else {
                category.save(userCategory,(err,savedCategory) => {
                    if (err) response.status(500).json(err)
                    else response.json(savedCategory)
                })
            }
        })
    }

    remove (request, response, next) {
        let {id} = request.params
        database.db.models.category.get(id, (err,category) => {
            if (err) response.status(404).json(err)
            else {
                category.remove((err,deletedCategory) => {
                    if (err) response.status(500).json(err)
                    else response.json(deletedCategory)
                })
            }
        })
    }
}

module.exports = new CategoryController()