const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')


router.post('/tasks', [auth], async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/tasks', [auth], async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        // const tasks = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', [auth], async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router