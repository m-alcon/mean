const   nodemailer = require("nodemailer"),
        emailTemplates = require("../templates/email.templates"),
        { promisify } = require ("util")

class EmailManager {
    constructor () {
        this.init()
    }

    async init() {
        let smtpConfig = {
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true, // TLS
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        };
        this.transporter = nodemailer.createTransport(smtpConfig,[])
        try {
            await this._verify()
            console.log(' * Server is ready to take our messages');
        } catch (error) {
            console.log(error);
        }
    }

    async sendEmail(user, email, token) {
        let message = emailTemplates.signUpMessage(email,user,token)
        try {
            await this._sendMail(message)
        } catch (error) {
            if (error) 
                return console.log(error)
        }
    }

    _sendMail (message) {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(message, error => {
                if (error) reject(error)
                else resolve()
            })
        })
    }

    _verify () {
        return new Promise((resolve, reject) => {
            this.transporter.verify(error => {
                if (error) reject(error)
                else resolve()
            })
        })
    }
}

module.exports = new EmailManager()