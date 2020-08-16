const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./mongoose')

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
