const   express = require("express")

const   controllers = require("./controllers")
        // controllers.quote = require("./controllers/quote.controller")
        // controllers.movie = require("./controllers/movie.controller")
        // controllers.category = require("./controllers/category.controller")
        // controllers.character = require("./controllers/character.controller")
        // controllers.auth = require("./controllers/auth.controller")

class Router {
    
    constructor() {
        this.router = express.Router()
        this.addRoutes()
    }

    addRoutes() {
        /*
            AUTH
        */
        this.router.post("/login", controllers.auth.login)
        this.router.post("/signup", controllers.auth.signup)
        this.router.post("/logout", controllers.auth.logout)
        this.router.get("/confirm-email", controllers.auth.validate)

        this.router.route("/quotes/:id")
            .get(/*controllers.auth.authenticate, */controllers.quote.getSingle)
            .put(controllers.auth.authenticate, controllers.quote.update)
            .delete(controllers.auth.authenticate, controllers.quote.remove)

        this.router.route("/quotes")
            .get(/*controllers.auth.authenticate, */controllers.quote.getAll)
            .post(controllers.auth.authenticate, controllers.quote.create)   

        this.router.route("/movies/:id")
            .get(/*controllers.auth.authenticate, */controllers.movie.getSingle)
            .put(controllers.auth.authenticate, controllers.movie.update)
            .delete(controllers.auth.authenticate, controllers.movie.remove)

        this.router.route("/movies")
            .get(/*controllers.auth.authenticate, */controllers.movie.getAll)
            .post(controllers.auth.authenticate, controllers.movie.create)

        this.router.route("/categories/:id")
            .get(/*controllers.auth.authenticate, */controllers.category.getSingle)
            .put(controllers.auth.authenticate, controllers.category.update)
            .delete(controllers.auth.authenticate, controllers.category.remove)

        this.router.route("/categories")
            .get(/*controllers.auth.authenticate, */controllers.category.getAll)
            .post(controllers.auth.authenticate, controllers.category.create)

        this.router.route("/characters/:id")
            .get(/*controllers.auth.authenticate, */controllers.character.getSingle)
            .put(controllers.auth.authenticate, controllers.character.update)
            .delete(controllers.auth.authenticate, controllers.character.remove)

        this.router.route("/characters")
            .get(/*controllers.auth.authenticate, */controllers.character.getAll)
            .post(controllers.auth.authenticate, controllers.character.create)      
    }
}

module.exports = new Router().router;