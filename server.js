// get express module
const express = require('express')
//creates express app
const app = express()

// module that helps with file and directory path
const path = require('path')
const PORT = process.env.PORT || 3500

//serve static assets from root to /public dir
app.use('/', express.static(path.join(__dirname, '/public')))

//app starts server and console log when successful
app.listen(PORT, () => console.log(`SErver running on port ${PORT}`))