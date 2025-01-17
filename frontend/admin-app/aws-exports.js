const awsconfig = {
  aws_project_region: 'us-east-2',
  aws_cognito_region: 'us-east-2', 
  aws_user_pools_id: 'us-east-2_aljmrgSWV', 
  aws_user_pools_web_client_id: '6uhs62u6k3rela2or6h5kqdtrq',
  oauth: {
    domain: 'us-east-2e0cjnjvdw.auth.us-east-2.amazoncognito.com', 
    scope: ['email', 'openid', 'profile'], 
    redirectSignIn: 'http://localhost:3000', 
    redirectSignOut: 'http://localhost:3000', 
    responseType: 'code', 
  },
};

export default awsconfig;
