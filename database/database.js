const   orm = require("orm")

const   quote = require("../models/quote")
        quoteSeeds = require("./seeds/quote.seed")
        user = require("../models/user")
        userSeeds = require("./seeds/user.seed")
        movie = require("../models/movie")
        movieSeeds = require("./seeds/movie.seed")
        category = require("../models/category")
        categorySeeds = require("./seeds/category.seed")

class Database {
    
    constructor() {
        this.init()
    }

    init() {
        orm.connect(process.env.DB_CONNECTION_STRING, (error, db) => {
            if (error) console.error(error)
            else console.log("Connected successfully")

            this.db = db

            quote.define(this.db)
            user.define(this.db)
            movie.define(this.db)
            category.define(this.db)

            this.db.drop(() => {
                this.db.sync((err) => {
                    if (err) console.error(error)
                    else console.log("Models added successfully")
                    
                    this.db.models.quote.create(quoteSeeds, (err) => {
                        if (err) console.error(error)
                        else console.log("Quote seed added successfully")
                    })

                    this.db.models.user.create(userSeeds, (err) => {
                        if (err) console.error(error)
                        else console.log("User seed added successfully")
                    })

                    this.db.models.movie.create(movieSeeds, (err) => {
                        if (err) console.error(error)
                        else console.log("Movie seed added successfully")
                    })

                    this.db.models.category.create(categorySeeds, (err) => {
                        if (err) console.error(error)
                        else console.log("Category seed added successfully")
                    })
                })
            })
        })

    }
}

module.exports = new Database();