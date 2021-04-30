import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });
        
        if (!user) return res.sendStatus(401); 
        // There is no user with that email. We want to return the same
        // status code so that people can't fish around for emails to see
        // who has an account and who doesn't

        const { _id: id, isVerified, passwordHash, salt, info } = user;
        const pepper = process.env.PEPPER_STRING;
        
        const isCorrect = await bcrypt.compare(salt + password + pepper, passwordHash);

        if (isCorrect) {
            jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return res.sendStatus(500)
                }
                res.status(200).send({ token });
            });
        } else {
            res.sendStatus(401); // This is the "not authenticated" status code - remember it!
        }
    }
}