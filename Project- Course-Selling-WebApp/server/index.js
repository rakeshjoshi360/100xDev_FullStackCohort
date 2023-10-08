const express = require('express')
const mongoose = require('mangoose')
const cors = require('cors')
const adminRouter = require("./routes/admin")

const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

app.use('/admin', adminRouter)

mongoose.connect('mongodb+srv://rakeshjoshi3098:WHOb9KLa1GB49jox@cluster0.5cbsaqf.mongodb.net/courses',  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });



app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})