const   database = require("../database/database")

class Character {
    define (db) {
        db.define("character", {
            name: {
                type: "text",
                required: true,
                unique: true
            },
            actor: {
                type: "text",
                required: true
            }
        })
    }

    associate (db) {
        let {character,movie} = db.models
        character.hasOne("movie", movie)
    }
}

module.exports = new Character()