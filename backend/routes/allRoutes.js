const express = require('express')
const route = express()
const Controller = require('../controller.js/allController')
const authMiddleware = require('../middleware/auth')


route.post('/register',Controller.registerUser)
route.post('/login',Controller.loginUser)

route.post('/todo/add',authMiddleware,Controller.addTodo)
route.get('/todo/fetch',authMiddleware,Controller.fetchTodo)
route.put('/todo/update',authMiddleware,Controller.updateTodo)
route.post('/todo/complete',authMiddleware,Controller.complete)
route.delete('/todo/delete',authMiddleware,Controller.deleteToDo)


module.exports = route