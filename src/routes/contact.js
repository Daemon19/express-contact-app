const express = require('express')
const { loadContacts, findContact } = require('../utils/contacts')

const router = express.Router()

router.get('/', (req, res) => {
  const contacts = loadContacts()
  res.render('contacts', { contacts })
})

router.get('/:id', (req, res) => {
  const contact = findContact(req.params.id)
  res.render('contact', { contact })
})

module.exports = router
