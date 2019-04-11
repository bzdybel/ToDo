const express = require('express')
const app = express()
const PORT = 3006

app.use(express.static('../front-end'))
app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`))
