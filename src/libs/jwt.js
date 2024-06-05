import jwt from 'jsonwebtoken';

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            'zyx123',
            {
                expiresIn: '1d'
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        );
    });
};