class User {
    define (db) {
        db.define("user", {
            email: {
                type: "text",
                required: true,
                unique: true
            },
            password: {
                type: "text",
                required: true
            },
            name: {
                type: "text",
                required: false
            },
            surname: {
                type: "text",
                required: false
            }
        })
    }
}

module.exports = new User()