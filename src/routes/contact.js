const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const { body, check, validationResult } = require('express-validator')
const {
  loadContacts,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact
} = require('../utils/contacts')

const router = express.Router()

// Konfigurasi flash
router.use(cookieParser('secret'))
router.use(session({
  cookie: { maxAge: 6000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
router.use(flash())

router.get('/', (req, res) => {
  const contacts = loadContacts()
  res.render('contacts', { contacts, msg: req.flash('msg') })
})

router.get('/add', (req, res) => {
  res.render('add-contact')
})

router.post('/', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value)
    if (duplikat) {
      throw new Error('Nama kontak telah digunakan!')
    }
    return true
  }),
  check('email', 'E-mail tidak valid!').optional({ checkFalsy: true }).isEmail(),
  check('noHp', 'No. HP tidak valid!').isMobilePhone('id-ID')
],
(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('add-contact', { errors: errors.array() })
  }

  addContact(req.body)
  req.flash('msg', 'Kontak berhasil ditambahkan!')
  res.redirect('/contacts')
})

router.get('/delete/:nama', (req, res) => {
  if (!deleteContact(req.params.nama)) {
    res.status(404).send('<h1>Kontak tidak ditemukan!</h1>')
  }
  req.flash('msg', 'Kontak berhasil dihapus!')
  res.redirect('/contacts')
})

router.get('/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama)
  res.render('edit-contact', { contact })
})

router.post('/update/:nama', [
  body('nama').custom((value, { req }) => {
    const duplikat = cekDuplikat(value)
    if (value !== req.params.nama && duplikat) {
      throw new Error('Nama kontak telah digunakan!')
    }
    return true
  }),
  check('email', 'E-mail tidak valid!').optional({ checkFalsy: true }).isEmail(),
  check('noHp', 'No. HP tidak valid!').isMobilePhone('id-ID')
],
(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('edit-contact', {
      errors: errors.array(),
      contact: { ...req.body, namaLama: req.params.nama }
    })
  }
  updateContact(req.body, req.params.nama)
  req.flash('msg', 'Kontak berhasil diubah!')
  res.redirect('/contacts')
})

router.get('/:nama', (req, res) => {
  const contact = findContact(req.params.nama)
  res.render('contact', { contact })
})

module.exports = router
