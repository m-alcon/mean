const   orm = require("orm"),
        promisify = require("util").promisify

const   models = Object.entries(require("../models")),
        seeds = require("./seeds")


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
            for (let [key, model] of models) {
                model.define(this.db)
            }
            //Defining DB relations
            for (let [key, model] of models) {
                if (model.associate) model.associate(this.db)
            }

            
            if (process.env.ENV === 'development') {
                 await this._drop()
                console.log(" - Dropped successfully")
            }

            await this._sync()
            console.log(" - Models added successfully")

            if (process.env.ENV === 'development') {
                await this.crud("category", "create", seeds.category)
                await this.crud("character", "create", seeds.character)
                Promise.all([
                    this.crud("quote", "create", seeds.quote),
                    this.crud("user", "create", seeds.user),
                    this.crud("movie", "create", seeds.movie)
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