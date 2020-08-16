const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mongoose_base', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(_ => {
    console.log('mongoose connected')
}).catch(_ => {
    console.log('mongoose couldn\'t connect')
})