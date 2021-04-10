import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        // Make sure there's no existing user with that email - no verification yet
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            return res.sendStatus(409); // 409 is the "conflict" error code
        }

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Store email and password hash in database (i.e. create user) - you'll also want to get the id
        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        }

        const result = await db.collection('users').insertOne({
            email,
            isVerified: false,
            passwordHash,
            info: startingInfo,
        });
        const { insertedId } = result;

        jwt.sign({
            id: insertedId,
            isVerified: false,
            email,
            info: startingInfo,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send({ token });
        });
    },
};