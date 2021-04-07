const COGNITO_URL = 'https://readit-jarellan.auth.us-east-1.amazoncognito.com';
const APP_CLIENT_ID = '7ou0c42gcjq5pd1umsla2v704j';
const READIT_DEPLOYMENT_URL = 'https://prod.duqwiygr0tq44.amplifyapp.com';
const READIT_API_URL = 'https://smhznnsms7.execute-api.us-east-1.amazonaws.com/prod';
const READIT_AUTH_URL = 'https://7vk1251zyf.execute-api.us-east-1.amazonaws.com/dev';

const CONSTANTS = {
  READIT_API_URL,
  READIT_AUTH_URL,
  SIGN_IN_URL: `${COGNITO_URL}/login?client_id=${APP_CLIENT_ID}&response_type=token&scope=email+openid&redirect_uri=${READIT_DEPLOYMENT_URL}`,
  SIGN_UP_URL: `${COGNITO_URL}/signup?client_id=${APP_CLIENT_ID}&response_type=token&scope=email+openid&redirect_uri=${READIT_DEPLOYMENT_URL}`,
}

export default CONSTANTS;

