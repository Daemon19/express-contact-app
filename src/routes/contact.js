const express = require('express')
const { loadContacts, findContact, addContact } = require('../utils/contacts')

const router = express.Router()

router.get('/', (req, res) => {
  const contacts = loadContacts()
  res.render('contacts', { contacts })
})

router.get('/add', (req, res) => {
  res.render('add-contact')
})

router.post('/', (req, res) => {
  console.log(req.body)
  addContact(req.body)
  res.redirect('/contacts')
})

router.get('/:id', (req, res) => {
  const contact = findContact(req.params.id)
  res.render('contact', { contact })
})

module.exports = router
