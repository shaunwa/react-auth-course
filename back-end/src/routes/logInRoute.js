import jwt from 'jsonwebtoken';
import {
    AuthenticationDetails,
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';
import { getDbConnection } from '../db';
import { awsUserPool } from '../util/awsUserPool';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        new CognitoUser({ Username: email, Pool: awsUserPool })
            .authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
                onSuccess: async result => {
                    // We're not using these for now
                    const token = {
                        accessToken: result.getAccessToken().getJwtToken(),
                        idToken: result.getIdToken().getJwtToken(),
                        refreshToken: result.getRefreshToken().getToken(),
                    } 

                    const db = getDbConnection('react-auth-db');
                    const user = await db.collection('users').findOne({ email });
                    
                    const { _id: id, isVerified, passwordHash, info } = user;
                    
                    jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).send({ token });
                    });
                },
                onFailure: err => {
                    res.sendStatus(401);
                },
            });
    }
}