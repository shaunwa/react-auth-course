import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from '../util/useQueryParams';

export const PleaseVerifyEmailPage = () => {
    const history = useHistory();
    const { email } = useQueryParams();

    useEffect(() => {
        setTimeout(() => {
            history.push(`/verify-email?email=${encodeURIComponent(email)}`);
        }, 3000);
    }, [history, email]);

    return (
        <div className="content-container">
            <h1>Thanks for signing up!</h1>
            <p>
                A verification email has been send to the email address you provided.
                Please verify your email to unlock the full site features.
            </p>
        </div>
    );
}