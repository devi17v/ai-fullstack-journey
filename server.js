const express = require('express')
const path = require('path')
const port = process.env.PORT || 5000
const posts = require('./routes/post')

const app = express()

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/api/posts', posts)

app.listen(port, () => console.log(`server is running successfully ${port}`))
