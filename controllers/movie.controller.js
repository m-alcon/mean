const   database = require("../database/database")

class MovieController {
    getAll (request, response, next) {
        database.db.models.movie.find({}, (err,movie) => {
            if (err) response.status(500).json(err)
            else response.json(movie)
        })
    }

    getSingle (request, response, next) {
        let {id} = request.params
        database.db.models.movie.get(id, (err,movie) => {
            if (err) response.status(404).json(err)
            else response.json(movie)
        })
    }

    create (request, response, next) {
        let userMovie = request.body
        database.db.models.movie.create(userMovie, (err,movie) => {
            if (err) response.status(500).json(err)
            else response.json(movie)
        })
    }
    
    update (request, response, next) {
        let {id} = request.params,
            userMovie = request.body
        database.db.models.movie.get(id, (err,movie) => {
            if (err) response.status(404).json(err)
            else {
                movie.save(userMovie,(err,savedMovie) => {
                    if (err) response.status(500).json(err)
                    else response.json(savedMovie)
                })
            }
        })
    }

    remove (request, response, next) {
        let {id} = request.params
        database.db.models.movie.get(id, (err,movie) => {
            if (err) response.status(404).json(err)
            else {
                movie.remove((err,deletedMovie) => {
                    if (err) response.status(500).json(err)
                    else response.json(deletedMovie)
                })
            }
        })
    }
}

module.exports = new MovieController()