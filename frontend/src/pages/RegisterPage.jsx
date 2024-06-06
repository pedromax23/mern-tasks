import { Button, Card, Input, Label } from '../components/ui';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { register: singnup, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await singnup(data);

    if (user) {
      navigate('/profile')
    }
  });

  return (
    <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
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

        <h1 className='text-4xl font-bold text-center'>Register</h1>

        <form onSubmit={onSubmit}>

          <Label htmlFor={'name'}>
            Name
          </Label>
          <Input placeholder="Enter your fullname"
            {...register('name', {
              required: true,
            })}
          />
          {errors.name && <p className='text-red-500'>El nombre es requerido</p>}

          <Label htmlFor={'email'}>
            Email
          </Label>
          <Input type="email" placeholder="Enter your email"
            {...register('email', {
              required: true,
            })}
          />
          {errors.email && <p className='text-red-500'>El email es requerido</p>}

          <Label htmlFor={'password'}>
            Password
          </Label>
          <Input type="password" placeholder="Enter your password"
            {...register('password', {
              required: true,
            })}
          />
          {errors.password && <p className='text-red-500'>El password es requerido</p>}


          <Button>Register</Button>

          <div className='flex justify-between my-4'>
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login" className='font-bold'>
              Login
            </Link>
          </div>
        </form>
      </Card >
    </div>
  )
}

export default RegisterPage