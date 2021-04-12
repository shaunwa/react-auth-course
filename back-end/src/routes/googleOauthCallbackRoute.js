import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../util/getGoogleUser';
import { updateOrCreateUserFromOauth } from '../util/updateOrCreateUserFromOauth';

export const googleOauthCallbackRoute = {
    path: '/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;

        const oauthUserInfo = await getGoogleUser({ code });
        const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });
        const { _id: id, isVerified, email, info } = updatedUser;
        
        jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, (err, token) => {
            res.redirect(`http://localhost:3000/login?token=${token}`);
        });
    },
}