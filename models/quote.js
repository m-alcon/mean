class Quote {
    define (db) {
        db.define("quote", {
            text: {
                type: "text",
                required: true
            }
        })
    }

    associate (db) {
        let {quote,category} = db.models
        quote.hasOne("category", category)

        let {character} = db.models
        quote.hasOne("character", character)
    }
}

module.exports = new Quote()