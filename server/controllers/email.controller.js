const   nodemailer = require("nodemailer")

class EmailController {
    constructor () {
        this.init()
    }

    init() {
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
        this.transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(' * Server is ready to take our messages');
        }
        });
    }

    sendEmail(user, email, token) {
        let message = {
            from: 'smtpmiquel@gmail.com', // listed in rfc822 message header
            to: email, // listed in rfc822 message header
            subject: 'Movile Quotes App - Confirm your email',
            text: `Welcome to Movie Quotes App ${user}!\n
                Click on the link http://moviequotesapp.herokuapp.com//api/confirm-email?token=${token} 
                to validate your email.`,
            html: `<p>Welcome to Movie Quotes App ${user}!<br><br>
                Click <a href="http://moviequotesapp.herokuapp.com//api/confirm-email?token=${token}">here</a>
                to validate your email.</p>`
            // envelope: {
            //     from: 'Miquel <smtpmiquel@gmail.com', // used as MAIL FROM: address for SMTP
            //     to: 'miquel.1996@gmail.com, Miquel1996 <miquel.1996@gmail.com>' // used as RCPT TO: address for SMTP
            // }
        }
        this.transporter.sendMail(message, error => {
            if (error) return console.log(error)
        })
    }
}

module.exports = new EmailController()