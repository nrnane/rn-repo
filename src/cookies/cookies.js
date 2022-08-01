import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = "@movingful";
export const IS_LOGGED_IN = 'isLoggedIn';

let storeData;
const updateStoreData=async()=>{
    let storeData = {};
    const store_data = await AsyncStorage.getItem(STORAGE_KEY);
    if (store_data) {
        storeData = JSON.parse(store_data);
    }
    console.log(storeData);
    return storeData
}
const setItem = (key, value) => {
    return new Promise(async (resolve) => {
        let newData = null;
        if (!storeData) {
            storeData = await updateStoreData();
        }
        storeData[key] = value;
        newData = JSON.stringify(storeData);
        console.log(newData)
        const setItm = await AsyncStorage.setItem(STORAGE_KEY, newData);
        resolve(setItm);
    });
}


const getItem = (key) => {
    return new Promise(async (resolve) => {
        if (!storeData) storeData = await updateStoreData();
        if (storeData) {
            resolve(storeData[key]);
        }
        return resolve(null);
    })
}

const isLoggedIn = async () => {
    return new Promise(async resolve => {
        const login = await getItem(IS_LOGGED_IN);
        console.log(login, 'login');
        if (login) {
            resolve(true);
        }
        resolve(false);
    });

}

const setLoggedIn = async () => {
    return new Promise(async resolve => {
        const resp = await setItem(IS_LOGGED_IN, true);
        resolve();
    })
}

const clear = () => {
    return new Promise(async resolve => {
        await AsyncStorage.clear();
        storeData = null;
        resolve();
    });
}


export { setItem, getItem, isLoggedIn, setLoggedIn, clear };