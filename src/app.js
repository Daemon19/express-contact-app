const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')

const indexRouter = require('./routes/index')

const PORT = process.env.PORT ?? 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(indexRouter)

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))
