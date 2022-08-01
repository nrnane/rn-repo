import React, { Suspense } from "react";
import { JourneyProps } from "./Interfaces";
import ProcessJourney from './processJourney';
import {NavigationContainer} from '@react-navigation/native';
import { Spinner } from "../atoms";
// import { Auth } from 'aws-amplify';
const Journey: React.FC<JourneyProps> = (props) => {

    // const appState: any = useContextSelector(StoreContext, store => store?.appState);
    // const userInfoState: any = useContextSelector(StoreContext, store => store?.appState?.userInfo);
    // const dispatch: any = useContextSelector(StoreContext, store => store?.dispatch);
    // will reomve this state merger once we have only one provider in place

    // const { journeyStore } = useJourneyState();
    // const flattenAppState = flattenObject(appState);


    let tempValues = { } as any

    let fields = safelyGetNested(["goal", "fields"], props);
    if (fields) {
        const goalFields = Object.keys(fields);
        if (goalFields.length > 0) {
            goalFields.forEach(key => {
                if (Object.is(tempValues[key], undefined)) {
                    tempValues[key] = ""
                }
            })
        }
    }

    // const Stack = processJourney(props);
    const linking = {
        prefixes: ['movingfulproviderapp://']
      };
      
    return <>
        <NavigationContainer
            linking={linking}
            fallback={<Spinner  />}>
            <ProcessJourney {...props}/>
        </NavigationContainer>
    </>
}

const callbackFn = (result: any, currentValue: any) => {
    return (result && result[currentValue]) ? result[currentValue] : null
}
const safelyGetNested = (keyPath: any[], props: object) => {
    return keyPath.reduce(callbackFn, props);
}

export default Journey;