import { useHistory } from 'react-router-dom';

export const EmailVerificationSuccess = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email, now you can use all the app's features
            </p>
            <button onClick={() => history.push('/')}>Go to home page</button>
        </div>
    );
}