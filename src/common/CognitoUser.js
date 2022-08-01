import { Auth } from 'aws-amplify';
let cognitoUser;
function setCognitoUser(user) {
  if (user) {
    cognitoUser = user;
  }
}

function getCognitoUser() {
  return cognitoUser;
}



const getPoolSession = async (phNumber) => {
  let phoneNumber = phNumber;

  if (!phoneNumber)
    return false;
  try {
    let cognitoUserDetail = await Auth.signIn(phoneNumber, phoneNumber);
    setCognitoUser(cognitoUserDetail);
    return cognitoUserDetail;
  } catch (error) {

  }
  return false;
}

export { setCognitoUser, getCognitoUser, getPoolSession };