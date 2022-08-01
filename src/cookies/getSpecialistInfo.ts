import {isEmpty} from 'lodash';
import {getSpecialistDetails} from '../graphql/getSpecialistDetails.query';
import {parseSessionData, stringfyData} from '../utils/utils';

const getSpecialistInfo = async (sessionKey = 'specialistInfo') => {
  let specialistInfo: any = await parseSessionData(sessionKey);
  if (isEmpty(specialistInfo)) {
    const respData = await getSpecialistDetails();
    if (respData) {
      stringfyData(sessionKey, respData);
      specialistInfo = respData;
    }
  }
  return specialistInfo;
};
export {getSpecialistInfo};
