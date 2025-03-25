// get express module
const express = require('express')
//creates express app
const app = express()

// module that helps with file and directory path
const path = require('path')
const PORT = process.env.PORT || 3500

//serve static assets from root to /public dir
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))

//routed to 404.html if not found 
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

//app starts server and console log when successful
app.listen(PORT, () => console.log(`SErver running on port ${PORT}`))