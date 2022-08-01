import {Auth} from 'aws-amplify';
import { getCognitoUser, setCognitoUser } from '../common/CognitoUser';
import { clear } from '../cookies';
import { getEnvVariable } from '../utils/utils';
function SignUpHook() {
  const countryCode = getEnvVariable("COUNTRY_CODE");
  const signUp = async (uname: string, requestParams: any) => {
    return Auth.signUp({
      //NOSONAR
      username: `${countryCode}${uname}`,
      password: `${countryCode}${uname}`,
      attributes: requestParams,
    });
  };

  const cognitoLogin = async (phone: string) => {
    const up = `${countryCode}${phone}`;

    return Auth.signIn(up, up).then(res => {
      //NOSONAR
     setCognitoUser(res);
      console.log('Cognito signIn response', res);
      return res;
    });
  };

  const confirmSignUpCode = (phone: any, code: any) => {
    const up = `${countryCode}${phone}`;
    Auth.confirmSignUp(up, code)
      .then(res => {
        console.log('SignUp Cofirm Resp', res);
      })
      .catch(err => {
        console.log('Error in Auth confirmSignUp', err);
      });
  };

  const confirmLoginOtp = async (code: any) => {
    const cognitouser = getCognitoUser();
    console.log(
      'confirmLoginOtp hook -> sendCustomChallengeAnswer call inputs',
      cognitouser,
      code,
    );
    return Auth.sendCustomChallengeAnswer(cognitouser, code).then(res => {
      console.log('otp verified successfully ', res);
      return res;
    });
  };
  const logout = async () => {
    try {
      await Auth.signOut();
      await clear();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  return [
    signUp,
    cognitoLogin,
    confirmSignUpCode,
    confirmLoginOtp,
    logout,
  ] as const;
}
export default function useSignUpHook() {
  const [
    cognitoSignUp,
    cognitoLogin,
    confirmSignUpCode,
    confirmLoginOtp,
    cognitoLogout,
  ] = SignUpHook();

  return {
    cognitoSignUp,
    cognitoLogin,
    confirmSignUpCode,
    confirmLoginOtp,
    cognitoLogout,
  };
}
