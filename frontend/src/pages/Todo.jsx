import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { addTodoAPI, fetchToDoAPI, updateToDoAPI, completeToDoAPI, deleteToDoAPI } from '../api/api';

const API_URL = 'http://localhost:5000/todos';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetchToDoAPI();
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await addTodoAPI(newTodo);
        setTodos([...todos, response.data.data]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (index) => {
    const todoToDelete = todos[index];
    try {
      await deleteToDoAPI(todoToDelete._id);
      setTodos(todos.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (index) => {
    const todoToToggle = todos[index];
    try {
      const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
      await completeToDoAPI(updatedTodo);
      setTodos(todos.map((todo, i) => (i === index ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].task);
  };

  const handleUpdateTodo = async () => {
    const todoToUpdate = todos[editingIndex];
    try {
      const updatedTodo = { ...todoToUpdate, task: editingText };
      await updateToDoAPI(updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo, i) => (i === editingIndex ? updatedTodo : todo))
      );
      setEditingIndex(null);
      setEditingText('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 relative">
      <div className="absolute top-4 right-4">
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md">
          Logout
        </button>
      </div>
      <div className="flex flex-col max-w-xl p-6 rounded-md sm:p-10 bg-white shadow-md">
        <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow p-2 border rounded-l-md"
          />
          <button onClick={handleAddTodo} className="px-4 py-2 bg-blue-600 text-white rounded-r-md">
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li key={todo._id} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(index)}
                  className="mr-2"
                />
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="p-1 border rounded"
                  />
                ) : (
                  <span className={`flex-grow ${todo.completed ? 'line-through' : ''}`}>
                    {todo.task}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {editingIndex === index ? (
                  <button
                    onClick={handleUpdateTodo}
                    className="px-3 py-1 bg-green-600 text-white rounded-md"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditTodo(index)}
                      className="p-2 bg-yellow-600 text-white rounded-md"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(index)}
                      className="p-2 bg-red-600 text-white rounded-md"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
