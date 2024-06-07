import { Card, Input, Button, Label, Container } from '../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { login, errors: loginErrors } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const user = await login(data);

    if (user) navigate('/tasks')

  })

  return (
    <Container className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <Card>

        {
          loginErrors && (
            loginErrors.map((err, id) => (
              <p key={'error' + id} className='bg-red-500 text-white p-2 text-center'>
                {err}
              </p>
            ))
          )
        }

        <h1 className='text-4xl font-bold text-center'>Login</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">
            Email
          </Label>
          <Input type='email' placeholder='Email...'
            {...register('email', {
              required: true
            })}
          />
          {errors.email && <p className='text-red-500'>Email es requerido</p>}

          <Label htmlFor="password">
            Password
          </Label>
          <Input type='password' placeholder='Password...'
            {...register('password', {
              required: true
            })}
          />
          {errors.password && <p className='text-red-500'>Email es requerido</p>}

          <Button>
            Login
          </Button>

          <div className='flex justify-between my-4'>
            <p className='mr-4'>¿No tienes una cuenta?</p>
            <Link to="/register" className='font-bold'>
              Register
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default LoginPage