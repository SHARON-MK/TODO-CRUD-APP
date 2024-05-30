const userDB = require('../model/userModel');
const todoDB = require('../model/todo');
const encryptPassword = require('../config/passwordEncryption');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const userExists = await userDB.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(409).send({ message: 'Email already used', success: false });
        }

        const hashedPassword = await encryptPassword(req.body.password);
        req.body.password = hashedPassword;

        const newUser = new userDB(req.body);
        await newUser.save();

        res.status(201).send({ message: 'Registration successful', success: true });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userDB.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User does not exist', success: false });
        }

        const passMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passMatch) {
            return res.status(401).send({ message: 'Password is incorrect', success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '20m' });
            res.status(200).send({ message: 'Login successful', success: true, data: token });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false });
    }
};

const addTodo = async (req, res) => {
    try {
        const newTodo = new todoDB({
            userId: req.body.userId,
            task: req.body.newTodo,
            completed: false
        });
        await newTodo.save();
        res.status(201).send({ message: 'New Todo added', success: true, data: newTodo });
    } catch (error) {
        console.error('Error saving todo:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false });
    }
};

const fetchTodo = async (req, res) => {
    try {
        const userId = req.body.userId;
        const todos = await todoDB.find({ userId: userId });
        res.status(200).send({ message: 'Todos fetched', success: true, data: todos });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false });
    }
};

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todoDB.findByIdAndUpdate(req.body.updatedTodo._id, req.body.updatedTodo, { new: true });
        if (!updatedTodo) {
            return res.status(404).send({ message: 'Todo not found', success: false });
        }
        res.status(200).send({ message: 'Todo updated', success: true, data: updatedTodo });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false });
    }
};

const complete = async (req, res) => {
    try {
        const todo = await todoDB.findOne({ _id: req.body.updatedTodo._id });
        if (!todo) {
            return res.status(404).send({ message: 'Todo not found', success: false });
        }
        const updatedStatus = !todo.completed;
        await todoDB.updateOne({ _id: req.body.updatedTodo._id }, { completed: updatedStatus });
        res.status(200).send({ message: `Todo marked as ${updatedStatus ? 'completed' : 'incomplete'}`, success: true });
    } catch (error) {
        console.error('Error updating todo status:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false });
    }
};

const deleteToDo = async (req, res) => {
    try {
        const result = await todoDB.deleteOne({ _id: req.body.id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Todo not found', success: false });
        }
        res.status(200).send({ message: 'Todo deleted', success: true });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false });
    }
};

module.exports = {
    registerUser,
    loginUser,
    addTodo,
    fetchTodo,
    updateTodo,
    complete,
    deleteToDo
};
