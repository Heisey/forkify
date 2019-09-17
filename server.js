const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, './dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"))
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`app is running on ${port}`)
})
