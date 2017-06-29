const   bcrypt = require ("bcrypt-nodejs"),
        { promisify } = require ("util")

const   database = require ("../database/database"),
        httpResponse = require ("../utils/http-response"),
        jwt = require ("jsonwebtoken")

let _generateToken = email => {
    return jwt.sign(
        { email }, 
        process.env.SERVER_PRIVATE_KEY, 
        { expiresIn: "7 days" }
    )
}

class AuthController {
    async login (request, response) {

        let {email, password} = request.body
        try {
            let users = await database.crud("user","find", {email})

            if (users.length) {
                let user = users[0]
                if (bcrypt.compareSync(password, user.password)) {
                    httpResponse.ok(response, {token: _generateToken(user.email)})
                }
                else return httpResponse.unauthorized(response)
            }
            else httpResponse.unauthorized(response)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }

    async signup (request, response) {
        let {email, password, username} = request.body
        try {
            let user = await database.crud("user", "create", {
                email: email,
                password: password,
                username: username
            })
            if (user)
                httpResponse.ok(response, {token: _generateToken(user.email)})
        } catch (error) {
            if (error.code == "ER_DUP_ENTRY")
                httpResponse.badRequest(response, error)
            else httpResponse.error(response, error)
        }
    }

    async authenticate (request, response, next) {
        let {token} = request.headers
        if (token) {
            let verify = await promisify(jwt.verify)
            try {
                let decoded = await verify(token, process.env.SERVER_PRIVATE_KEY)
                let users = await database.crud("user","find", {email: decoded.email})
                if (users.length){
                    request.loggedUser = users[0]
                    next()
                }
                else httpResponse.unauthorized(response)
            } catch (error) {
                httpResponse.unauthorized(response, error)
            }
        } else {
            httpResponse.unauthorized(response)
        }
    }
}

module.exports = new AuthController()