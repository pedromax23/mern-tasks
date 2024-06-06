import { Routes, Route } from 'react-router-dom'

import NavBar from './components/navbar/NavBar'
import { Container } from './components/ui'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'
import TaskFormPage from './pages/TaskFormPage'
import ProfilePege from './pages/ProfilePege'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>

      <NavBar />

      <Container className={'py-5'}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/tasks/new' element={<TaskFormPage />} />
          <Route path='/tasks/1/edit' element={<TaskFormPage />} />
          <Route path='/profile' element={<ProfilePege />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>

    </>
  )
}

export default App
