const { verify } = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET || 'secret'

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (authorization) {
      verify(authorization, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Unauthorized" })

        } else {
          req.decodedToken = decodedToken;
          next();
        }
      })

    } else {
      return res.status(400).json({ message: "No authorization provided" })
    }

  } catch (error) {
    console.log(error)
  }
}