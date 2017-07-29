const   bcrypt = require ("bcrypt-nodejs"),
        { promisify } = require ("util"),
        jwt = require ("jsonwebtoken"),
        cookieParser = require("cookie-parser")

const   database = require ("../database/database"),
        httpResponse = require ("../utils/http-response"),
        mail = require("../utils/email-manager")
        

let _generateToken = email => {
    return jwt.sign(
        { email }, 
        process.env.SERVER_PRIVATE_KEY, 
        { expiresIn: "7 days" }
    )
}

class AuthController {
    async signup (request, response) {
        let {email, password, username} = request.body
        try {
            let token = _generateToken(username)
            let user = await database.crud("user", "create", {
                email: email,
                password: password,
                username: username,
                valid: token
            })
            if (user) {
                //response.cookie("api-token", token)
                mail.sendEmail(user.username,email,token)
                httpResponse.ok(response, {token: token } )
            }
        } catch (error) {
            if (error.code == "ER_DUP_ENTRY")
                httpResponse.badRequest(response, error)
            else httpResponse.error(response, error)
        }
    }

    async validate (request, response) {
        let {token} = request.query,
            auxUser,
            user
        try {
            let users = await database.crud("user","find", {valid: token})
            user = users[0]
            auxUser = {
                username: user.username,
                password: user.password,
                email: user.email,
                valid: "1"
            }
        } catch (error) {
            return httpResponse.notFound(response, error)
        }
        user.save(auxUser,(error, savedUser) => {
            if (error) {
                if (error.type == "validation" || error.code == "ER_BAD_FIELD_ERROR") {
                    return httpResponse.badRequest(response, error)
                }
                else return httpResponse.error(response, error)
            }
            else {
                return response.redirect("http://moviequotesapp.herokuapp.com/validate")
            }
        })
    }

    async login (request, response) {
        let {username, email, password} = request.body,
            user
        try {
            let users = await database.crud("user","find", {username})
            if (!users.length) {
                users = await database.crud("user","find", {email})
            }
            if (users) {
                user = users[0]
                if (!users.length || !bcrypt.compareSync(password, user.password)) {
                    return httpResponse.unauthorized(response)
                }
                if (user.valid === "1") {
                    let token = _generateToken(user.email)
                    response.cookie("api-token", token)
                    return httpResponse.ok(response, {token: token })
                }
                else {
                    return httpResponse.badRequest(response,"Not confirmed email.")
                }
                
            }
            else return httpResponse.unauthorized(response)
        } catch (error) {
            httpResponse.error(response, error)
        }
    }

    async logout (request, response) {
        let token = request.cookies["api-token"]

        if (token) {
            response.clearCookie("api-token")
            return httpResponse.ok(response, {token: token } )
        }
        else {
            return httpResponse.badRequest(response)
        }
    }

    async authenticate (request, response, next) {
        let token = request.cookies["api-token"]
        if (token) {
            let verify = await promisify(jwt.verify)
            try {
                let decoded = await verify(token, process.env.SERVER_PRIVATE_KEY),
                    users = await database.crud("user","find", {email: decoded.email})
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