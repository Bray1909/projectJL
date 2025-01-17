import { signInWithRedirect } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import awsconfig from '../../../aws-exports';


Amplify.configure(awsconfig);

export const redirectToHostedUI = async () => {
  try {
    await signInWithRedirect();
  } catch (error) {
    console.error('Error redirecting to Hosted UI:', error);
  }
};
