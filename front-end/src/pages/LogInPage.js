import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

export const LogInPage = () => {
    const [token, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const history = useHistory();

    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        history.push('/');
    }

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                name='email'
                value={emailValue}
                placeholder='someone@gmail.com'
                onChange={e => setEmailValue(e.target.value)} />
            <input
                name='password'
                type='password'
                value={passwordValue}
                placeholder='Password'
                onChange={e => setPasswordValue(e.target.value)} />
            <hr />
            <button
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}
            >Log In</button>
            <button onClick={() => history.push('/forgot-password')}>Forgot your password??</button>
            <button onClick={() => history.push('/signup')}>Don't have an account? Sign Up</button>
        </div>
    );
}