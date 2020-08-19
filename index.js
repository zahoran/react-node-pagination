const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = process.env.PORT

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./mongoose')

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 100
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    throw new Error('From my middleware')
})

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log('App is running on port', port)
})
