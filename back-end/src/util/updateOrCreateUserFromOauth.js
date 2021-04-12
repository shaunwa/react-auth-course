import { getDbConnection } from '../db';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    const {
        id: googleId,
        verified_email: isVerified,
        email,
    } = oauthUserInfo; // Is the "email" stored like this?

    const db = getDbConnection('react-auth-db');
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) { // If user exists, add data to the existing user
        const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { googleId, isVerified } },
            { returnOriginal: false },
        );
        return result.value;
    } else { // Otherwise, create a new user profile
        const result = await db.collection('users').insertOne({ email, googleId, isVerified, info: {} /* ... */ }) // create new user
        return result.ops[0]; // This is apparently the way to get a newly inserted document
    }
}