import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

import Login from './pages/Login';
import Todo from './pages/Todo';
import Register from './pages/Register';

function App() {

  const ProtectedRoute = (props) => {

    if (localStorage.getItem('token')) {
      return props.children
    }
    else {
      return <Navigate to='/' />
    }
  }

  const PublicRoute = (props) => {

    if (localStorage.getItem('token')) {
      return <Navigate to='/todos' />
    }
    else {
      return props.children
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <PublicRoute> <Login />  </PublicRoute> } />
        <Route path="/todos" element={<ProtectedRoute> <Todo /> </ProtectedRoute>} />
        <Route path="/register" element={ <PublicRoute> <Register /> </PublicRoute>  } />

      </Routes>
    </Router>
  );
}

export default App;
