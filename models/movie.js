class Movie {
    define(db) {
        db.define("movie",{
            title: {
                type: "text",
                required: true,
                unique: true
            },
            director: {
                type: "text",
                required: true
            },
            year: {
                type: "integer",
                required: true
            }
        })
    }
}

module.exports = new Movie()