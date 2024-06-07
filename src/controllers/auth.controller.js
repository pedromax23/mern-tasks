import { Usuario } from '../db.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js'
import md5 from 'md5';

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    const findUser = await Usuario.findOne({
        where: {
            email,
        }
    })

    if (findUser === null) return res.status(404).json({ message: 'El correo no esta registrado' })

    const validPassword = await bcrypt.compare(password, findUser.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'La contraseña es incorrecta' })
    }

    const token = await createAccessToken({ id: findUser.id })
    res.cookie('token', token, {
        // httpOnly: true,
        secure: true, // Para que se pueda ver en el navegador
        sameSite: 'none', // Solo entre dominios se pueden consultar
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })



    return res.json(findUser)

};

// Registro de usuarios
export const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10)
        const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;

        const createUser = await Usuario.create({
            name,
            email,
            password: hashPassword,
            gravatar,
        })

        const token = await createAccessToken({ id: createUser.id })
        res.cookie('token', token, {
            // httpOnly: true,
            secure: true, // Para que se pueda ver en el navegador
            sameSite: 'none', // Solo entre dominios se pueden consultar
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.json(createUser)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "El email del usuario ya esta registrado" })
        }
        next(error)
    }
};

// Logout
export const logout = (req, res) => {

    res.clearCookie('token');

    res.sendStatus(200);
};


// Perfil
export const profile = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.userId)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userJson = user.toJSON();

        delete userJson.password;

        return res.json(userJson)
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};