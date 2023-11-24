const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const dotenv = require('dotenv')

const app = express()
const port = process.env.PORT
dotenv.config({ path: '/home/ubuntu/.env' });

app.use(cors());
app.use(express.json())

app.use('/admin', adminRouter)
app.use('/user', userRouter)

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5cbsaqf.mongodb.net/courses`, {dbName: "courses" });


app.listen(port, () => {
  console.log(`Backend app listening`)
})
