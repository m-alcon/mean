const   orm = require("orm")
        promisify = require("util").promisify

const   quote = require("../models/quote")
        quoteSeeds = require("./seeds/quote.seed")
        user = require("../models/user")
        userSeeds = require("./seeds/user.seed")
        movie = require("../models/movie")
        movieSeeds = require("./seeds/movie.seed")
        category = require("../models/category")
        categorySeeds = require("./seeds/category.seed")
        character = require("../models/character")
        characterSeeds = require("./seeds/character.seed")


class Database {
    
    constructor() {
        this.init()
    }

    async init() {
        try {
            //Connecting to the database
            this.db = await this._connect(process.env.DB_CONNECTION_STRING)
            console.log("Database connected successfully")

            //Defining DB models
            quote.define(this.db)
            user.define(this.db)
            movie.define(this.db)
            category.define(this.db)
            character.define(this.db)

             //Defining DB relations
            quote.associate(this.db)
            character.associate(this.db)

            if (process.env.ENV === 'development') {
                 await this._drop()
                console.log(" - Dropped successfully")
            }

            await this._sync()
            console.log(" - Models added successfully")

            if (process.env.ENV === 'development') {
                await this.crud("category", "create", categorySeeds)
                await this.crud("character", "create", characterSeeds)
                Promise.all([
                    this.crud("quote", "create", quoteSeeds),
                    this.crud("user", "create", userSeeds),
                    this.crud("movie", "create", movieSeeds)
                ]).then(() => console.log(" - Models seeded successfully"))
            }

            
        } catch (error) {
            return console.error(error)
        }
    }

    _drop () {
        return new Promise((resolve, reject) => {
            this.db.drop(error => {
                if (error) reject(error)
                else resolve()
            })
        })
    }

    _sync () {
        return new Promise((resolve, reject) => {
            this.db.sync(error => {
                if (error) reject(error)
                else resolve()
            })
        })
    }

    _connect (connectionString) {
        let connect = promisify(orm.connect)
        return connect(connectionString)

    }

    crud (model, func, object={}) {
        let create = promisify(this.db.models[model][func])
        return create(object)
    }
        
}

module.exports = new Database();