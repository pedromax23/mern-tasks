import { Link, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './navigation.js';
import { Container } from '../ui/Container.jsx'
import { useAuth } from '../../context/AuthContext.jsx';

function NavBar() {

    const location = useLocation()

    const { isAuth, logout } = useAuth();

    return (
        <nav className='bg-zinc-950'>
            <Container className='flex justify-between py-3'>
                <Link to={'/'}>
                    <h1 className='font-bold text-2xl'>Lista de Tareas</h1>
                </Link>

                <ul className='flex gap-x-2'>
                    {isAuth
                        ?
                        <>
                            {privateRoutes.map(({ path, name }) => (
                                <li key={path} className={
                                    `text-slate-300 px-3 py-1 ${location.pathname === path && "bg-sky-500"}`
                                }>
                                    <Link to={path}>
                                        {name}
                                    </Link>
                                </li>
                            ))}

                            <li onClick={() => {
                                logout();
                            }}>
                                Logout
                            </li>
                        </>

                        : publicRoutes.map(({ path, name }) => (
                            <li key={path} className={
                                `text-slate-300 px-3 py-1 ${location.pathname === path && "bg-sky-500"}`
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