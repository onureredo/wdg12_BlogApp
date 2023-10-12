import { useAuth } from '../Context/AuthProvider';
import { format } from 'date-fns';

function Profile() {
  const { userData } = useAuth();

  const formattedDate = userData.date
    ? format(new Date(userData.date), 'MMM dd, yyyy HH:mm:ss')
    : '';
  return (
    <div>
      <h1>Hello, {userData.username}</h1>
      <p>Email: {userData.email}</p>
      {formattedDate && <p>Joined on: {formattedDate}</p>}
    </div>
  );
}

export default Profile;
