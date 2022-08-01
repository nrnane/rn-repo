import React from 'react';
import {JourneyProps, JourneyPage, JourneyDefinition} from './Interfaces';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Library from './TemplatesLibrary';
import {Header} from '../organisms';

interface RenderComp {
  Route: any;
  screenProps: any;
}

const RenderComponent: React.FC<any> = ({Route, screenProps}: RenderComp) => {
  return <Route key={screenProps.path} {...screenProps} />;
};

const ProcessJourney = (props: JourneyProps) => {
  let routes: any = [];
  const {pages} = props;

  const Stack = createNativeStackNavigator();

  let initialRoute: string = '';

  routes = Object.keys(pages).map((pageName: string) => {
    const page: JourneyPage | JourneyDefinition = pages[pageName];
    if (page.initial) {
      initialRoute = page.path;
    }

    //@ts-ignore
    return (
      <Stack.Screen
        key={pageName}
        name={page.path}
        options={{headerShown: false}}
        //@ts-ignore
        screenOptions={{
          header: (props: any) => {
            console.log('props', props, page);
            return <Header {...props} />;
          },
        }}>
        {props => {
          return (
            <RenderComponent
              //@ts-ignore
              Route={Library[page.path]}
              screenProps={{...page, ...props}}
            />
          );
        }}
      </Stack.Screen>
    );
  });

  return (
    <Stack.Navigator initialRouteName={initialRoute}>{routes}</Stack.Navigator>
  );
};

export default ProcessJourney;
