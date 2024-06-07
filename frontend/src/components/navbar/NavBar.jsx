import { Link, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './navigation.jsx';
import { Container } from '../ui/Container.jsx'
import { useAuth } from '../../context/AuthContext.jsx';
import { BiLogOut } from "react-icons/bi";

function NavBar() {

    const location = useLocation()

    const { isAuth, logout, user } = useAuth();

    return (
        <nav className='bg-zinc-950'>
            <Container className='flex justify-between py-3'>
                <Link to={'/'}>
                    <h1 className='font-bold text-2xl'>Lista de Tareas</h1>
                </Link>

                <ul className='flex items-center justify-center md:gap-x-1'>
                    {isAuth
                        ?
                        <>
                            {privateRoutes.map(({ path, name, icon }) => (
                                <li key={path}>
                                    <Link
                                        className={`text-slate-300 px-3 py-1 flex items-center gap-x-1
                                            ${location.pathname === path && "bg-sky-500"}`}
                                        to={path}>
                                        {icon}

                                        <span className='hidden sm:block'>{name}</span>
                                    </Link>
                                </li>
                            ))}

                            <li className={
                                `text-slate-300 px-3 py-1 hover:cursor-pointer flex items-center`
                            } onClick={() => {
                                logout();
                            }}>
                                <BiLogOut className='w-5 h-5' />

                                <span className='hidden sm:block'>Logout</span>
                            </li>

                            <li className=' px-3 py-1 flex items-center gap-x-2'>
                                <Link to={'/profile'} className='text-slate-300 px-3 py-1 flex items-center gap-x-1'>
                                    <img src={user.gravatar} alt="" className='h-8 w-8 rounded-full' />
                                    <span className='font-medium'>
                                        {user.name}
                                    </span>
                                </Link>
                            </li>
                        </>

                        : publicRoutes.map(({ path, name }) => (
                            <li key={path} className={
                                `text-slate-300 px-3 py-1 flex items-center 
                                ${location.pathname === path && "bg-sky-500"}`
                            }>
                                <Link to={path}>
                                    {name}
                                </Link>
                            </li>
                        ))}

                </ul>
            </Container >
        </nav>
    )
}

export default NavBar