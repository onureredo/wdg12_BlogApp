/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { SpinnerCircularFixed } from 'spinners-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8000/posts')
      .then((response) => {
        //   console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <SpinnerCircularFixed
          size={50}
          thickness={100}
          speed={100}
          color='#36ad47'
          secondaryColor='rgba(0, 0, 0, 0.44)'
        />
      </div>
    );
  }

  return (
    <div className='flex justify-center flex-wrap my-4'>
      {posts.map((post) => {
        const formattedDate = post.date
          ? format(new Date(post.date), 'MMM dd, yyyy @HH:mm')
          : '';
        return (
          <div
            className='lg:w-1/4 m-4 border-2 border-slate-50 rounded-xl shadow-xl shadow-gray-500'
            key={post._id}
          >
            <div className='m-4 flex flex-col'>
              <h2 className='text-3xl font-semibold mb-4 text-center'>
                {post.title}
              </h2>
              <img
                className='rounded-xl my-4 object-fit h-48 w-full'
                src={post.image}
                alt={post.title}
              />
              <p>{post.content}</p>
              <p className='my-4'>
                <Link className='text-blue-500 hover:underline' to='/'>
                  @{post.author ? post.author.username : 'Unknown Author'}
                </Link>{' '}
                · {formattedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
