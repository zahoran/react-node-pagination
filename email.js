const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
    to: '*@gmail.com', //provide valid address
    from: '*@gmail.com',
    subject: 'proba uzenet',
    text: 'Szia! Mizu hogy vagy?'
}

sgMail.send(msg).then(r => {
    console.log('success')
}).catch(error => {
    console.log('something went wrong - ' + error)
})