import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error('Please fill all the columns');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { success, message, data } = response.data;
           
            if (success) {
               toast.success('Logged In')
                localStorage.setItem('token', data)
                navigate('/todos')
            } else {
                toast.error(message);
            }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during sign in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <ToastContainer />
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-400 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-600">Welcome to Sharon's To-Do App</p>
        </div>
        <form noValidate="" action="" className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-left">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="button"
                className="w-full px-8 py-3 font-semibold rounded-md bg-blue-600 text-white"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don't have an account yet ?
              <Link to="/register" className="register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
