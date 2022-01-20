const express = require('express')
const app = express()
const port = 5000
const connectDB = require('./db/connect')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
require('dotenv').config()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())



app.get('/', (req, res) => res.send('Hello World!'))




app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('DB Connection established')
        app.listen(port, () => console.log(`Server is listening on port ${port}!`))

    } catch (error) {
        console.log(error)
    }
}

start()