import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const history = useHistory();

    const onForgotPasswordClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => {
                history.push('/login'); // Should be this WITHOUT cognito
            }, 3000);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success!</h1>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email and we'll send you a reset link</p>
            {errorMessage && <div>{errorMessage}</div>}
            <input
                name='email'
                value={emailValue}
                placeholder='someone@gmail.com'
                onChange={e => setEmailValue(e.target.value)} />
            <button
                disabled={!emailValue}
                onClick={onForgotPasswordClicked}
            >Send Reset Link</button>
        </div>
    );
}