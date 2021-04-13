import { useState } from 'react';
import axios from 'axios';
import { useQueryParams } from '../util/useQueryParams';
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { PasswordResetFail } from './PasswordResetFail';

export const PasswordResetLandingPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const { email } = useQueryParams();

    const onResetClicked =  async () => {
        try {
            await axios.put(`/api/users/${confirmationCode}/reset-password`, { email, newPassword: passwordValue });
            setIsSuccess(true);
        } catch (error) {
            setIsFailure(true);
        }
    }

    if (isFailure) return <PasswordResetFail />;
    if (isSuccess) return <PasswordResetSuccess />;

    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            <p>Please enter a new password</p>
            <input
                value={confirmationCode}
                placeholder='Confirmation Code'
                onChange={e => setConfirmationCode(e.target.value)} />
            <input
                type='password'
                value={passwordValue}
                placeholder='Password'
                onChange={e => setPasswordValue(e.target.value)} />
            <input
                type='password'
                value={confirmPasswordValue}
                placeholder='Confirm Password'
                onChange={e => setConfirmPasswordValue(e.target.value)} />
            <hr />
            <button
                disabled={!passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue}
                onClick={onResetClicked}
            >Reset Password</button>
        </div>
    );
}