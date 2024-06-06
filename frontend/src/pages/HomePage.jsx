import { useAuth } from '../context/AuthContext'

function HomePage() {
  const data = useAuth();

  return (
    <div>HomePage</div>
  )
}

export default HomePage