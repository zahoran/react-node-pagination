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
    const options = {
        limit: 3
    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.skip) {
        options.skip = +req.query.skip
    }

    try {
        // const tasks = await Task.find({owner: req.user._id})
        const totalCount = await Task.find({owner: req.user._id}).count()
        await req.user.populate({
            path: 'tasks',
            match,
            options
        }).execPopulate()
        res.send({tasks: req.user.tasks, total: totalCount})
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