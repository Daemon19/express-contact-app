const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')

const indexRouter = require('./routes/index')
const aboutRouter = require('./routes/about')
const contactRouter = require('./routes/contact')

const PORT = process.env.PORT ?? 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')

app.use(express.urlencoded())
app.use(expressLayouts)
app.use(indexRouter)
app.use('/about', aboutRouter)
app.use('/contacts', contactRouter)
app.use((req, res) => res.status(404).send('<h1>404</h1>'))

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))
