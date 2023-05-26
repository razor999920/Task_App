const sgMail = require('@sendgrid/mail')

// Set API key
const sendGridApiKey = process.env.SEND_GRID_API_KEY;
sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "razor999920@outlook.com",
        subject: "Thank you for joining in!",
        text: `Welcome to the app, ${name}. We hope you enjoy the app!.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "razor999920@outlook.com",
        subject: "Sorry to see you go!",
        text: `Hello ${name}, We are sorry to see you leave but we hope to see you come back!.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}