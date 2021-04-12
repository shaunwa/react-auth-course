import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail';
import { getDbConnection } from '../db';

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;

        const db = getDbConnection('react-auth-db');
        const passwordResetCode = uuid();

        const { result } = await db.collection('users').updateOne({ email }, { $set: { passwordResetCode } });

        console.log(result);
        if (result.nModified > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: 'shaun.p.wassel@gmail.com',
                    subject: 'Password Reset',
                    text: `
                        Uh oh, looks like you forgot your password... no worries, it happens!
                        To reset it, click this link:
                        http://localhost:3000/reset-password/${passwordResetCode}
                    `
                });
            } catch (e) {
                console.log(e);
                res.send(500);
            }
        }
        
        // Send a 200 status NO MATTER WHAT (unless there's an internal error) - this makes it hard to fish around for emails
        res.sendStatus(200);
    },
};