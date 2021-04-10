import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const SignUpPage = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const history = useHistory();

    const onSignUpClicked = async () => {
        // This is where we'll make a request to the server
        // to create a new account.
        alert('Sign up not implemented yet');
    }

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
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
            <input
                name='confirm-password'
                type='password'
                value={confirmPasswordValue}
                placeholder='Confirm Password'
                onChange={e => setConfirmPasswordValue(e.target.value)} />
            <hr />
            <button
                disabled={
                    !emailValue ||
                    !passwordValue ||
                    passwordValue !== confirmPasswordValue
                }
                onClick={onSignUpClicked}
            >Sign Up</button>
            <button onClick={() => history.push('/login')}>Already have an account? Log In</button>
        </div>
    );
}