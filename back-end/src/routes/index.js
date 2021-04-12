import { forgotPasswordRoute } from './forgotPasswordRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
import { logInRoute } from './logInRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { signUpRoute } from './signUpRoute';
import { testEmailRoute } from './testEmailRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    forgotPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    logInRoute,
    resetPasswordRoute,
    signUpRoute,
    testEmailRoute,
    testRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
];
