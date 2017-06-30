const   express = require("express")

const   quoteController = require("./controllers/quote.controller")
        movieController = require("./controllers/movie.controller")
        categoryController = require("./controllers/category.controller")
        authController = require("./controllers/auth.controller")

class Router {
    
    constructor() {
        this.router = express.Router()
        this.addRoutes()
    }

    addRoutes() {
        /*
            AUTH
        */
        this.router.post("/login", authController.login)
        this.router.post("/signup", authController.signup)

        this.router.route("/quotes/:id")
            .get(authController.authenticate, quoteController.getSingle)
            .put(authController.authenticate, (request,response) => response.json("Put"))
            .post(authController.authenticate, quoteController.update)
            .delete(authController.authenticate, quoteController.remove)

        this.router.route("/quotes")
            .get(authController.authenticate, quoteController.getAll)
            .put(authController.authenticate, (request,response) => response.json("Put"))
            .post(authController.authenticate, quoteController.create)
            .delete(authController.authenticate, (request,response) => response.json("Delete"))      

        this.router.route("/movies/:id")
            .get(authController.authenticate, movieController.getSingle)
            .put(authController.authenticate, (request,response) => response.json("Put"))
            .post(authController.authenticate, movieController.update)
            .delete(authController.authenticate, movieController.remove)

        this.router.route("/movies")
            .get(authController.authenticate, movieController.getAll)
            .put(authController.authenticate, (request,response) => response.json("Put"))
            .post(authController.authenticate, movieController.create)
            .delete(authController.authenticate, (request,response) => response.json("Delete")) 

        this.router.route("/categories/:id")
            .get(authController.authenticate, categoryController.getSingle)
            .put(authController.authenticate, (request,response) => response.json("Put"))
            .post(authController.authenticate, categoryController.update)
            .delete(authController.authenticate, categoryController.remove)

        this.router.route("/categories")
            .get(authController.authenticate, categoryController.getAll)
            .put(authController.authenticate, (request,response) => response.json("Put"))
            .post(authController.authenticate, categoryController.create)
            .delete(authController.authenticate, (request,response) => response.json("Delete"))        
    }
}

module.exports = new Router().router;