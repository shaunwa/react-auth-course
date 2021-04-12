import { useHistory } from 'react-router-dom';

export const PasswordResetSuccess = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Your password has been reset, now please log in with your new password.
            </p>
            <button onClick={() => history.push('/login')}>Log in</button>
        </div>
    );
}