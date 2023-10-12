import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthProvider';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/auth/logout',
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className='flex justify-between items-center bg-blue-500 p-4 text-white text-lg font-bold border-b-4 border-blue-200'>
      <Link to='/' className='cursor-pointer hover:opacity-80'>
        <h1 className='text-lg'>WDG#012 BLOG APP</h1>
      </Link>
      <div className='flex items-center space-x-4'>
        {isLoggedIn ? (
          <div className='space-x-4'>
            <Link to='/post' className='cursor-pointer hover:opacity-80'>
              POST
            </Link>
            <button
              onClick={handleLogout}
              className='cursor-pointer hover:opacity-80'
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <Link to='/login' className='cursor-pointer hover:opacity-80 text-lg'>
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
