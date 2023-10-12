import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate('/');
        // window.location.reload();
        setIsLoggedIn(true);
      }
    } catch (error) {
      setError(error.response.data.error);
      toast.error(error.response.data.error || 'Invalid credentials');
    }
  };

  return (
    <div className='container mt-20 mx-auto max-w-md roundex-xl shadow-xl shadow-gray-500'>
      <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Login</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block mb-2'>E-Mail</label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border rounded w-full p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border rounded w-full p-2'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white rounded p-2 mt-2'
          >
            Login
          </button>
        </form>
        <p className='mt-4'>
          Don&rsquo;t have an account ?{' '}
          <Link to='/register' className='text-blue-500 underline'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
