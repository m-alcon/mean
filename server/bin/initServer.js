const   dotenv = require("dotenv")

dotenv.config()

const   Server = require("../server")

let server = new Server()
server.start(process.env.PORT)