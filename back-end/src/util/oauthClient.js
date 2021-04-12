import { google } from 'googleapis';

export const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:8080/auth/google/callback', // The endpoint that Google will redirect the user to with the security code query param
);