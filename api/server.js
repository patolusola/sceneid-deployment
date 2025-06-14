const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body
  const timestamp = new Date().toISOString()
  const entry = `${timestamp} | Name: ${name} | Email: ${email} | Message: ${message}\n`
  const file = path.join(__dirname, 'submissions.txt')

  fs.appendFile(file, entry, err => {
    if (err) return res.status(500).send('Failed to save submission')
    res.send('Submission received')
  })
})

app.listen(3000, () => console.log('API running on port 3000'))

