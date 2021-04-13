import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../util/awsUserPool';

export const resetPasswordRoute = {
    path: '/api/users/:confirmationCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { confirmationCode } = req.params;
        const { email, newPassword } = req.body;
        console.log({ email, confirmationCode, newPassword });

        new CognitoUser({ Username: email, Pool: awsUserPool })
            .confirmPassword(confirmationCode, newPassword, {
                onSuccess: result => {
                    res.sendStatus(200);
                },
                onFailure: result => {
                    res.sendStatus(401);
                },
            });
    },
};