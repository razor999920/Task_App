const sgMail = require('@sendgrid/mail')

// Set API key
const sendGridApiKey = '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';
sgMail.setApiKey(sendGridApiKey);

const msg = {
    to: 'razor999920@outlook.com',
    from: 'razor999920@outlook.com',
    subject: 'SendGrid test',
    text: 'NodeJS TaskApp Email sending test.',
    html: '<strong>NodeJS TaskApp</strong>',
}
sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })