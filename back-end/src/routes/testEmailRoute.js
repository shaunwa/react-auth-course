import { sendEmail } from '../util/sendEmail';

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: '<your email here>',
                from: '<your email here>',
                subject: 'Does this work?',
                text: 'If you\'re reading this... yes!',
            });
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};