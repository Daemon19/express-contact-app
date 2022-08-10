const express = require('express')

const indexRouter = require('./routes/index')

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(indexRouter)

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))