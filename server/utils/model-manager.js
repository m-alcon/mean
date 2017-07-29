class ModelManager {
    save (model, userModel) {
        return new Promise((resolve, reject) => {
            model.save(userModel, error => {
                if (error) reject(error)
                else resolve()
            })
        })
    }

    remove (model) {
        return new Promise((resolve, reject) => {
            character.remove((error,deletedCharacter) => {
                if (error) reject(error)
                else resolve(deletedCharacter)
            })
        })
    }
}

module.exports = new ModelManager()