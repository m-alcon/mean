class Category {
    define(db) {
        db.define("category", {
            name: {
                type: "text",
                required: true
            },
            description: {
                type: "text",
                required: true
            }
        })
    }
}

module.exports = new Category();