const router = require('express').Router();
const {
  hashPassword,
  comparePasswords,
  generateToken
} = require('./auth-helpers')

const db = require('../database/dbConfig')

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password are required!" })
    }

    const hashedPass = hashPassword(password)

    const [id] = await db('users').insert({ username, password:hashedPass })

    const [newUser] = await db('users').select('username', 'id').where({ id })

    res.json(newUser)

  } catch (e) {
    console.log(e)
  }
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
