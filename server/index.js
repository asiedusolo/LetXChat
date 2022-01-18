const express = require('express')
const app = express()
const port = 5000
const connectDB = require('./db/connect')
const authRouter = require('./routes/auth')
require('dotenv').config()





app.get('/', (req, res) => res.send('Hello World!'))




app.use('/api/auth', authRouter)

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