const   bcrypt = require ("bcrypt-nodejs")

class User {
    define (db) {
        db.defineType("password", {
            datastoreType: () => 'TEXT',
            propertyToValue: value => bcrypt.hashSync(value)
        })
        db.define("user", {
            email: {
                type: "text",
                required: true,
                unique: true
            },
            password: {
                type: "password",
                required: true
            },
            username: {
                type: "text",
                required: true
            },
            valid: {
                type: "text",
                required: true
            }
        })
    }
}

module.exports = new User()