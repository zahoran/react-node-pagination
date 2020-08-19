const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        await checkToken(req, res, next)
    } catch (e) {
        res.status(401).send()
    }
}

const checkToken = async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
    if (!user) {
        throw new Error()
    }
    req.token = token
    req.user = user
    next()
}

module.exports = auth