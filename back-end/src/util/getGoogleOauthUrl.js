import { oauthClient } from '../util/oauthClient';

export const getGoogleOauthUrl = () => {
    // These are the permissions ("scopes") our app is requesting from the user
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    // And here we generate the url that we'll send the user to.
    // It's possible to do this without the googleapis package, but easier this way.
    return oauthClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });
}