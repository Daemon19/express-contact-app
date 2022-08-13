const fs = require('fs')
const path = require('path')

const DIR_PATH = './data'
if (!fs.existsSync(DIR_PATH)) {
  fs.mkdirSync(DIR_PATH)
}

const DATA_PATH = path.join(DIR_PATH, 'contacts.json')
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, '[]', 'utf-8')
}

const loadContacts = () => {
  const json = fs.readFileSync(DATA_PATH, 'utf-8')
  const contacts = JSON.parse(json)
  return contacts
}

const findContact = (nama) => loadContacts().find(contact => contact.nama === nama)

const saveContacts = (contacts) => fs.writeFileSync(DATA_PATH, JSON.stringify(contacts))

const addContact = (contact) => {
  const contacts = loadContacts()
  contacts.push(contact)
  saveContacts(contacts)
}

const cekDuplikat = (nama) => {
  const contacts = loadContacts()
  return contacts.find((contact) => contact.nama === nama) !== undefined
}

/**
 * @param {string} nama
 * @return {boolean} true jika kontak ditemukan
 */
const deleteContact = (nama) => {
  const contacts = loadContacts()
  const index = contacts.findIndex((contact) => contact.nama === nama)
  if (index === -1) {
    return false
  }
  contacts.splice(index, 1)
  saveContacts(contacts)
  return true
}

const updateContact = (contactBaru, namaLama) => {
  const contacts = loadContacts()
  const index = contacts.findIndex((contact) => contact.nama === namaLama)
  if (index === -1) {
    return false
  }
  contacts[index] = contactBaru
  saveContacts(contacts)
  return true
}

module.exports = {
  loadContacts,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact
}
