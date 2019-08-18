const express = require('express')
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send('Hello Node JS World!')
    console.log('response sent')
})

app.listen(port, () => console.log(`example app listening on port ${port}!`))