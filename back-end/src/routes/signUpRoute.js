import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';
import { awsUserPool } from '../util/awsUserPool';

export const signUpRoute = {
    path: '/api/signup', // We're going to use the same route here and just swap out this route with the regular signUpRoute
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        // How many attributes you add here depends on how far down the AWS path you want to go.
        // Do you want your app to be deeply integrated with AWS, which will make it harder to switch later on?
        const attributes = [
            new CognitoUserAttribute({ Name: 'email', Value: email }),
            // Don't add the password here, that's for later
        ];
        
        // Here's how we sign up users with AWS cognito - this will take care of sending a verification email
        awsUserPool.signUp(email, password, attributes, null, async (err, awsResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Unable to sign up user' });
            }

            const db = getDbConnection('react-auth-db');

            // Store email and password in database (i.e. create user) - you'll also want to get the id
            const startingInfo = {
                hairColor: '',
                favoriteFood: '',
                bio: '',
            }

            const result = await db.collection('users').insertOne({
                email,
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
        });
    },
};