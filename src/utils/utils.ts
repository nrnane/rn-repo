import {Auth} from 'aws-amplify';
import {capitalize, startCase, template} from 'lodash';
import moment from 'moment';
import {
  getItem as getItemFromStorage,
  setItem as setItemToStorage,
} from '../cookies';
import Config from 'react-native-config';

//import {updateTaskDetails} from '../graphql/updateTask.mutation';
import {Alert, Linking} from 'react-native';
export enum UserTypes {
  AMBSDR = 'AMBSDR',
  VENDOR = 'VENDOR',
  CUSTMR = 'CUSTMR',
}
export enum businessTypes {
  MOVING = 'MOVING',
}

export const transformObj = (obj: any, type?: any) => {
  let arrayList: any = [];
  let respObj: any = {};
  obj &&
    obj.map((items: any) => {
      var formattedDate = items?.created_at
        ? moment(items?.created_at).format('MM/DD/YY')
        : '';
      if (type === 'customers') {
        respObj = {
          title: items?.full_name,
          subTitle:
            items?.ambassadors?.length > 0
              ? items?.ambassadors[0]?.comp_name
              : '',
          rightBottom: formattedDate,
        };
      } else if (type === 'referral') {
        respObj = {
          title: items?.first_name,
          leftBottom: items?.comp_name,
          rightBottom:
            items?.clients?.length > 0
              ? items?.clients?.length + ' Clients'
              : ' 0 Clients',
          icon: items?.business_type,
          id: items?.id,
          meta_data: items?.meta_data,
        };
      } else if (type === 'leadSpend') {
        respObj = {
          title: items?.client?.full_name,
          subtitle:
            items?.client?.ambassadors?.length > 0
              ? items?.client?.ambassadors[0]?.comp_name
              : '',
          value: items?.amount,
          subvalue: formattedDate,
        };
      }
      arrayList.push(respObj);
    });
  return arrayList;
};

export const setUserType = (key: any, value: any) => {
  setItemToStorage(key, value);
};

export const setCompPhone = (key: string = 'comp_phone', value: any) => {
  setItemToStorage(key, value);
};
export const getCompPhone = async (key: string = 'comp_phone') => {
  let data = await getItemFromStorage(key);
  return data ?? '';
};
export const setProviderId = (value: any) => {
  setItemToStorage('providerId', value);
};
export const setIsAccountReady = (value: any) => {
  setItemToStorage('isOnboarded', value);
};
export const getIsAccountReady = async () => {
  let data = await getItemFromStorage('isOnboarded');
  return data ?? '';
};
export const getProviderId = async () => {
  let data = await getItemFromStorage('providerId');
  return data ?? '';
};
export const setBusinessType = (value: any) => {
  setItemToStorage('businessType', value);
};

export const getBusinessType = async () => {
  let data = await getItemFromStorage('businessType');
  return data ?? '';
};
export const getEnvVariable = (envVar: any) => {
  const envObj: any = {
    COUNTRY_CODE: Config.REACT_APP_COUNTRY_CODE
      ? Config.REACT_APP_COUNTRY_CODE
      : '+1',
    ENV: Config.REACT_APP_ENV ? Config.REACT_APP_ENV : 'wip',
  };

  return envObj[envVar] ? envObj[envVar] : undefined;
};
export const vendorEnvLink = (envMode: any) => {
  const vendorLinkObj: any = {
    wip: process.env.REACT_APP_VENDOR_ONBOARDING_URL
      ? process.env.REACT_APP_VENDOR_ONBOARDING_URL
      : 'https://provider.movingfuldev.com/provider-signup',
    alpha: process.env.REACT_APP_VENDOR_ONBOARDING_URL
      ? process.env.REACT_APP_VENDOR_ONBOARDING_URL
      : 'https://provider-a.movingfuldev.com/provider-signup',
    beta: process.env.REACT_APP_VENDOR_ONBOARDING_URL
      ? process.env.REACT_APP_VENDOR_ONBOARDING_URL
      : 'https://provider-b.movingfuldev.com/provider-signup',
    prod: process.env.REACT_APP_VENDOR_ONBOARDING_URL
      ? process.env.REACT_APP_VENDOR_ONBOARDING_URL
      : '',
  };
  return vendorLinkObj[envMode] ? vendorLinkObj[envMode] : undefined;
};
export const getJourneyFileName = (userType: any, subJourneyType: any = '') => {
  const journeyFile: any = {
    AMBSDR: process.env.REACT_APP_JOURNEY_FILE
      ? process.env.REACT_APP_JOURNEY_FILE
      : 'ambassadorJourney',
    VENDOR: process.env.REACT_APP_JOURNEY_FILE
      ? process.env.REACT_APP_JOURNEY_FILE
      : 'providerJourney',
    CUSTMR: process.env.REACT_APP_JOURNEY_FILE
      ? process.env.REACT_APP_JOURNEY_FILE
      : `customerJourney${capitalize(subJourneyType)}`,
  };

  return journeyFile[userType] ? journeyFile[userType] : undefined;
};
export const IsLoggedIn = async () => {
  return Auth.currentSession()
    .then((result: any) => {
      if (result.accessToken.jwtToken) {
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
};
//   // DATE FORMAT END

export const formatDate = (dateVal: any) => {
  var weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  let date = new Date(dateVal).getDay();
  let movingDay: string = new Date(dateVal).getDate().toString();
  let movingDateString: string =
    movingDay.length === 1 ? '0' + movingDay : movingDay;
  let movingMonth = dateVal ? dateVal.getMonth() + 1 : new Date().getMonth();
  let movingYear = dateVal ? dateVal.getFullYear() : new Date().getFullYear();

  return (
    weekday[date] +
    ', ' +
    movingMonth +
    '/' +
    movingDateString +
    '/' +
    movingYear
  );
};

export const phoneFormat = (phone: string) => {
  if (!phone) {
    return '';
  }

  const validPhone = phone.replace(/^\+[0-9]/, ''); //replace(/[^\w\s]/gi, '')
  const phoneFormatArray: any = validPhone.match(/(\d{3})(\d{3})(\d{4})/);

  return `(${phoneFormatArray[1]}) ${phoneFormatArray[2]}-${phoneFormatArray[3]}`;
};

export const unMaskPhoneNumber = (phone: string) => {
  return phone
    ?.replace('(', '')
    ?.replace(')', '')
    ?.replace('-', '')
    ?.replace(' ', '');
};

export const getStoreValue = (
  key: string,
  journeyStoreRef: any,
  defVal?: any,
) => {
  if (journeyStoreRef && journeyStoreRef[key]) return journeyStoreRef[key];
  return defVal;
};

export const getCustomerId = async () => {
  let data = await getItemFromStorage('customerId');

  if (data) {
    return data;
  } else {
    console.error('No customer id found in the app.');
    //either throw an exception or redirect user to some page.
  }
};

// get dailysheetId
export const getDailysheetId = async () => {
  let data = await getItemFromStorage('dailysheetId');
  if (data) {
    return data;
  } else {
    console.error('No dailysheetId found in the app.');
  }
};

export const getRandomNumber = () => {
  return new Date().getTime();
};

export const calculateBase64SignSize = (base64: any) => {
  let size = 0;
  if (base64) {
    const buffer = Buffer.from(base64?.substring(base64?.indexOf(',') + 1));
    size = buffer?.length || 0;
  }

  return size;
};
/* 
export function dataURItoBlob(dataURI: any) {
  var binary = atob(dataURI?.split(',')[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/png'});
} */
export const getInterpolationText = (
  text: any,
  data: any,
  defaultVariableValue: any = '0',
  firstCase: any = false,
) => {
  const interpolateStr = template(text);
  const key = text?.replace(/.*\{|\}.*/g, '');
  if (data[key]) {
    data[key] = firstCase ? startCase(data[key]) : data[key];

    return interpolateStr(data);
  } else {
    return text?.replaceAll(`{${key}}`, defaultVariableValue).replace('$', '');
  }
};

export const isDevEnv = () => {
  let isDevEnvironment = false;

  if (!['production', 'uat'].includes(getEnvVariable('ENV')?.toLowerCase())) {
    isDevEnvironment = true;
  }

  return isDevEnvironment;
};

export const VALIDATE_REGX = {
  PHONE_REGX: /^\d{10}$/,
  PHONE_REGX_11: /^\d{11}$/,
};

export const isValidPhone = (phone: any) => {
  if (phone) {
    const formatNo = phone ? phone.replace(/\D/g, '') : '';
    return (
      formatNo.match(VALIDATE_REGX.PHONE_REGX) ||
      formatNo.match(VALIDATE_REGX.PHONE_REGX_11)
    );
  }
  return true;
};

export const isValidWebsite = (URL: any) => {
  if (URL) {
    let exp = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const regex = new RegExp(exp);
    return regex.test(URL);
  }
  return true;
};

export const isValidEmail = (email: any) => {
  if (email) {
    let exp =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regex = new RegExp(exp);
    return regex.test(email);
  }
  return true;
};

export const getTernaryResult = (obj: any, yesVal: any, noValue: any) => {
  return obj ? yesVal : noValue;
};
/* 
export const realtorStripOnboarding = () => {
  let params = {
    redirect_url: getEnvVariable('REDIRECT_URL_FROM_STRIPE_ONBOARDING'),
  };
  return createRealtorPaymentAccount(params)
    .then((resp: any) => {
      if (resp) {
        if (resp?.generated_link) {
          navigate(resp?.generated_link);
        }

        return resp?.generated_link;
      } else {
        return false;
      }
    })
    .catch((e: any) => {
      console.log('Error in createRealtorPaymentAccount', e);
    });
};
export const callCreateVendorPaymentLink = async () => {
  let params = {
    redirect_url: getEnvVariable('PAYMENT_SUCCESS_REDIRECTION_URL'),
    vendor_cancel_url: getEnvVariable('PAYMENT_FAILED_REDIRECTION_URL'),
  };
  return createVendorPaymentLink(params)
    .then((respData: any) => {
      if (respData) {
        if (respData?.payment_link) {
          navigate(respData?.payment_link);
        }
        return respData?.payment_link;
      } else {
        console.log('Error in createVendorPaymentLink');
      }
    })
    .catch((e: any) => {
      console.log('Error in createVendorPaymentLink', e);
    });
};
 */
export const stringfyData = (sessionKey: any, data: any) => {
  try {
    setItemToStorage(sessionKey, JSON.stringify(data));
  } catch {
    setItemToStorage(sessionKey, '{}');
  }
};

export const parseSessionData = async (sessionKey: any) => {
  try {
    return JSON.parse((await getItemFromStorage(sessionKey)) as string);
  } catch {
    return JSON.parse('{}');
  }
};

export const callUpdateTask = (getCustomerData: any) => {
  let params = {
    business_type: getCustomerData?.type,
    client_id: getCId(),
    completed: true,
    vendor_id:
      getCustomerData?.vendor_id !== 'null' ? getCustomerData?.vendor_id : '',
    task_day: getCustomerData?.taskDay,
    notes: getCustomerData?.note,
    send_sms: getCustomerData?.send_sms,
  };
  /*let resp: any = updateTaskDetails(params);
  if (resp) {
    return resp;
  } else {
    return false;
  }*/
};

export const readQueryParamAndSave = (qs: any = [], qsObj: any = {}) => {
  const search = new URLSearchParams(qsObj);
  qs?.map((paramName: any) => {
    const paramValue = search.get(paramName);
    if (
      paramValue != null &&
      paramValue !== '' &&
      typeof paramValue !== 'undefined'
    ) {
      setItemToStorage(paramName, paramValue);
    }
  });
};

export const getCId = async () => {
  let data = await getItemFromStorage('cid');
  if (data) {
    return data;
  } else {
    console.log('No customer id found in the app.');
    //either throw an exception or redirect user to some page.
  }
};

export const getVId = async () => {
  let data = await getItemFromStorage('vid');
  if (data) {
    return data;
  } else {
    console.log('No vendor id found.');
    //either throw an exception or redirect user to some page.
  }
};

export const getBusinessTagLine = (type: any) => {
  const tagLineObj: any = {
    MOVING: {
      displayName: 'Moving',
      tagLine: 'Make your new home sparkle.',
    },
    CLEANING: {
      displayName: 'Cleaning',
      tagLine: 'Make your new home sparkle.',
    },
    LOCKSMITH: {
      displayName: 'Locksmith',
      tagLine: 'Make your new home safe secure.',
    },
    ELECTRICITY: {
      displayName: 'Electricity',
      tagLine: 'Light up your new home.',
    },
  };

  return tagLineObj[type] ? tagLineObj[type] : undefined;
};

export const getTestimonial = (data: any) => {
  let testimonial = '';
  let others =
    data?.realtor_others && data?.realtor_others !== '0'
      ? `& ${data?.realtor_others} other realtors `
      : '';
  if (data?.recommended && data?.realtor_full_name) {
    testimonial = `Movingful recommended <span> ${data?.realtor_full_name} </span> for their clients `;
  } else {
    if (data?.realtor_full_name && data?.realtor_comp_name && data?.comp_name) {
      testimonial = `${data?.realtor_full_name} at ${data?.realtor_comp_name} ${others} choose <span> ${data?.comp_name} </span> for their clients`;
    }
  }
  return testimonial;
};

export const getProviderCount = (business_type: any, providersData: any) => {
  let isDisbale = false;
  let providerType = providersData?.filter(
    (item: any) => item.business_type === business_type,
  );
  let providerCount = providerType?.length;
  if (business_type === 'MOVING' && providerCount >= 3) {
    isDisbale = true;
  } else if (business_type != 'MOVING' && providerCount >= 1) {
    isDisbale = true;
  }

  return isDisbale;
};

export const setOwnProvider = (type: any) => {
  try {
    setItemToStorage(type, true);
  } catch {
    setItemToStorage(type, false);
  }
};

export const getOwnProvider = async (type: any) => {
  return (await getItemFromStorage(type)) === 'true' ? true : false;
};

export const flatObject = (input: any) => {
  const flat: any = (res: any, key: any, val: any, pre = '') => {
    const prefix = [pre, key].filter(v => v);
    const value = val ? val : '';
    return typeof value === 'object'
      ? Object.keys(value).reduce(
          (prev, curr) => flat(prev, curr, value[curr], prefix),
          res,
        )
      : Object.assign(res, {[prefix[prefix.length - 1]]: value});
  };

  return Object.keys(input).reduce(
    (prev, curr) => flat(prev, curr, input[curr]),
    {},
  );
};

export const openInNativeApp = (
  app: 'call' | 'email' | string,
  content: any,
) => {
  let appUrl = '';
  if (app == 'call') {
    appUrl = `tel:${content}`;
  } else if (app == 'email') {
    appUrl = `mailto:${content}`;
  } else {
    appUrl = `${app}:${content}`;
  }
  Linking.canOpenURL(appUrl)
    .then(supported => {
      console.log(supported);
      if (supported) Linking.openURL(appUrl);
      else Alert.alert('cannot open app', appUrl+" Not supported");
    })
    .catch(err => {
      console.log(err);
    });
};
