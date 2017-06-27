const   express = require("express")

const   quoteController = require("./controllers/quote.controller")
        movieController = require("./controllers/movie.controller")
        categoryController = require("./controllers/category.controller")

class Router {
    
    constructor() {
        this.router = express.Router()
        this.addRoutes()
    }

    addRoutes() {
        this.router.route("/quotes/:id")
            .get(quoteController.getSingle)
            .put((request,response) => response.json("Put"))
            .post(quoteController.update)
            .delete(quoteController.remove)

        this.router.route("/quotes")
            .get(quoteController.getAll)
            .put((request,response) => response.json("Put"))
            .post(quoteController.create)
            .delete((request,response) => response.json("Delete"))      

        this.router.route("/movies/:id")
            .get(movieController.getSingle)
            .put((request,response) => response.json("Put"))
            .post(movieController.update)
            .delete(movieController.remove)

        this.router.route("/movies")
            .get(movieController.getAll)
            .put((request,response) => response.json("Put"))
            .post(movieController.create)
            .delete((request,response) => response.json("Delete")) 

        this.router.route("/categories/:id")
            .get(categoryController.getSingle)
            .put((request,response) => response.json("Put"))
            .post(categoryController.update)
            .delete(categoryController.remove)

        this.router.route("/categories")
            .get(categoryController.getAll)
            .put((request,response) => response.json("Put"))
            .post(categoryController.create)
            .delete((request,response) => response.json("Delete"))        
    }
}

module.exports = new Router().router;