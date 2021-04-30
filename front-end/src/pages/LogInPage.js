import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useQueryParams } from '../util/useQueryParams';
import { useToken } from '../auth/useToken';

export const LogInPage = () => {
    const [, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();

    const history = useHistory();

    useEffect(() => {
        if (oauthToken) { // If there's a token, that means we were just redirected back here from Oauth
            setToken(oauthToken);
            history.push('/');
        }
    }, [oauthToken, setToken, history]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('/auth/google/url');
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (e) {
                console.log(e);
                setErrorMessage(e.message);
            }
        }

        loadOauthUrl();
    }, []);

    const onLogInClicked = async () => {
        try {
            const response = await axios.post('/api/login', {
                email: emailValue,
                password: passwordValue,
            });
            const { token } = response.data;
            setToken(token);
            history.push('/');
        } catch (e) {
            console.log(e);
            setErrorMessage(e.message);
        }
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
            <button
                disabled={!googleOauthUrl}
                onClick={() => { window.location.href = googleOauthUrl; }}
            >
                Log in with Google
            </button>
        </div>
    );
}