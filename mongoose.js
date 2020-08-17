const mongoose = require('mongoose')

const urlString = process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/mongoose_base'

mongoose.connect(urlString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(_ => {
    console.log('mongoose connected')
}).catch(_ => {
    console.log('mongoose couldn\'t connect')
})