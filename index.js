const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./mongoose')

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(express.json())
if (!process.env.PORT) { // cors will be disabled on heroku, because client is hosted on the same url and port
    app.use(cors())
}
app.use(userRouter)
app.use(taskRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log('App is running on port', port)
})
