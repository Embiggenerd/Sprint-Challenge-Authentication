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

    const [id] = await db('users').insert({ username, password: hashedPass })

    const [newUser] = await db('users').select('username', 'id').where({ id })

    res.json(newUser)

  } catch (e) {
    console.log(e)
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password are required!" })
    }

    const [user] = await db('users').select('*').where({ username })

    const authenticated = comparePasswords(password, user.password)

    const token = generateToken(user)

    if(authenticated) {
      return res.json({token})
    }

    return res.status(400).json({message: "Try again!"})
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;
