import { useAuth } from '../context/AuthContext';

function ProfilePege() {

  const { user } = useAuth();

  return (
    <div>
      {JSON.stringify(user, null, 2)}
    </div>
  )
}

export default ProfilePege