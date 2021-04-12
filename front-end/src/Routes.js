import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './auth/PrivateRoute';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LogInPage } from './pages/LogInPage';
import { PasswordResetLandingPage } from './pages/PasswordResetLandingPage';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyEmailPage';
import { SignUpPage } from './pages/SignUpPage';
import { UserInfoPage } from './pages/UserInfoPage';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/verify-email">
                    <EmailVerificationLandingPage />
                </Route>
                <Route path="/login">
                    <LogInPage />
                </Route>
                <Route path="/forgot-password">
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password/:passwordResetCode">
                    <PasswordResetLandingPage />
                </Route>
                <Route path="/please-verify">
                    <PleaseVerifyEmailPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
            </Switch>
        </Router>
    );
}