import { CognitoUserPool } from 'amazon-cognito-identity-js';
import AWS, { CognitoIdentityCredentials } from 'aws-sdk';
import nodeFetch from 'node-fetch';
global.fetch = nodeFetch; // we need to do this because the amazon-cognito-identity-js package will try to use "fetch"

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
});

// We get this data when we set up a user pool in Cognito
const poolData = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    ClientId: process.env.AWS_CLIENT_ID,
};

export const awsUserPool = new CognitoUserPool(poolData);