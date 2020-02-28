const { genSaltSync, hashSync, compareSync } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET || "secret"

const salt = genSaltSync(10)

module.exports.hashPassword = password =>
    hashSync(password, salt)

module.exports.comparePasswords = (password, hashedPassword) =>
    compareSync(password, hashedPassword)

module.exports.generateToken = ({ id, username }) => {
    const payload = {
        subject: id,
        username,
    };

    const options = {
        expiresIn: "1h",
    };

    return sign(payload, jwtSecret, options);
}