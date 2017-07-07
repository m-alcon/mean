const   express = require("express")

const   quoteController = require("./controllers/quote.controller")
        movieController = require("./controllers/movie.controller")
        categoryController = require("./controllers/category.controller")
        characterController = require("./controllers/character.controller")
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
            .get(/*authController.authenticate, */quoteController.getSingle)
            .put(authController.authenticate, quoteController.update)
            .delete(authController.authenticate, quoteController.remove)

        this.router.route("/quotes")
            .get(/*authController.authenticate, */quoteController.getAll)
            .post(authController.authenticate, quoteController.create)   

        this.router.route("/movies/:id")
            .get(/*authController.authenticate, */movieController.getSingle)
            .put(authController.authenticate, movieController.update)
            .delete(authController.authenticate, movieController.remove)

        this.router.route("/movies")
            .get(/*authController.authenticate, */movieController.getAll)
            .post(authController.authenticate, movieController.create)

        this.router.route("/categories/:id")
            .get(/*authController.authenticate, */categoryController.getSingle)
            .put(authController.authenticate, categoryController.update)
            .delete(authController.authenticate, categoryController.remove)

        this.router.route("/categories")
            .get(/*authController.authenticate, */categoryController.getAll)
            .post(authController.authenticate, categoryController.create)

        this.router.route("/characters/:id")
            .get(/*authController.authenticate, */characterController.getSingle)
            .put(authController.authenticate, characterController.update)
            .delete(authController.authenticate, characterController.remove)

        this.router.route("/characters")
            .get(/*authController.authenticate, */characterController.getAll)
            .post(authController.authenticate, characterController.create)      
    }
}

module.exports = new Router().router;