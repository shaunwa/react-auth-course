import { useState } from 'react';
import axios from 'axios';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { useToken } from '../auth/useToken';
import { useQueryParams } from '../util/useQueryParams';

export const EmailVerificationLandingPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [verificationString, setVerificationString] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { email } = useQueryParams();
    const [, setToken] = useToken();

    const onSubmitVerificationString = async () => {
        try {
            const response = await axios.put('/api/verify-email', { email, verificationString });
            const { token } = response.data;
            setToken(token);
            setIsSuccess(true);
        } catch (error) {
            console.log(error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
    }

    if (isSuccess) return <EmailVerificationSuccess />

    return (
        <div className="content-container">
            <h1>Please Verify Your Email</h1>
            <p>You should have received a verification code at the address you provided. Please enter it here:</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={verificationString}
                placeholder='e.g. 123456'
                onChange={e => setVerificationString(e.target.value)} />
            <button onClick={onSubmitVerificationString}>Submit</button>
        </div>
    );
}