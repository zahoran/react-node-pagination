const mongoose = require('mongoose')

const urlString = process.env.MONGODB_URI

mongoose.connect(urlString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(_ => {
    console.log('mongoose connected')
}).catch(_ => {
    console.log('mongoose couldn\'t connect')
})