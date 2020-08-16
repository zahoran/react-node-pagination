const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.status(200).send({user: {_id: user._id}, token})
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

router.get('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send(req.user)
    } catch (e) {
        res.send(400)
    }
})

router.get('/users/me', [auth], async (req, res) => {
    res.status(200).send(req.user)
})

router.patch('/users/me', [auth], async (req, res) => {
    try {
        Object.keys(req.body).forEach(param => {
            console.log('param', param)
            req.user[param] = req.body[param]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router