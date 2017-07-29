class EmailTemplates {
    constructor() {
        this._message = {
            from: process.env.EMAIL_FROM, // listed in rfc822 message header
            to: "", // listed in rfc822 message header
            subject: "",
            text: "",
            html: ""
        }
    }

    signUpMessage(toEmail, toUser, token) {
        this._message.to = toEmail
        this._message.subject = 'Movile Quotes App - Confirm your email'
        this._message.text = 
            `Welcome to Movie Quotes App ${toUser}!\n
            Click on the link http://moviequotesapp.herokuapp.com/api/confirm-email?token=${token} 
            to validate your email.`
        this._message.html =
             `<p>Welcome to Movie Quotes App ${toUser}!<br><br>
                Click <a href="http://moviequotesapp.herokuapp.com/api/confirm-email?token=${token}">here</a>
                to validate your email.</p>`
        return this._message
    }
}

module.exports = new EmailTemplates()
