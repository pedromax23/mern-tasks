import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui';

function HomePage() {
  const data = useAuth();

  return (
    <Card>
      <h1 className='text-3xl font-bold my-4'>Home Page</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro voluptatibus officiis doloribus deserunt ratione tenetur commodi atque, similique laboriosam, sequi dolores, nisi facere obcaecati. Sunt voluptas vel perferendis atque ipsum!</p>
    </Card>
  )
}

export default HomePage