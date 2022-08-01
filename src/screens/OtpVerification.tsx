import React, { useRef, useState } from 'react';
import {
  VStack,
  Box,
  HStack,
  Icon,
  Text,
  Button,
  Image,
  IconButton,
  Center,
  FormControl,
  Hidden,
  Input,
  Pressable,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import GuestLayout from '../../layouts/GuestLayout';
import useSignUpHook from '../actions/useSignUpHook';
import {StoreContext} from '../journeys/context/JourneyContext';

import {useContextSelector} from '@fluentui/react-context-selector';
import actionTypeConstants from '../reducers/actionTypeConstants';


export interface IProps {
  navigation: any;
}

export default function OtpVerification(props:IProps) {
  const {confirmSignUpCode, confirmLoginOtp, cognitoLogin} = useSignUpHook();
  const dispatch: any = useContextSelector(
    StoreContext,
    store => store?.dispatch,
  );

  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const onLogin = async (code?: any) => {
    //let isLoginFlow = props?.route?.params?.isLogin;
    console.log(code,code.length)
    let navigatePath = 'drawer';
    //if (code && code?.length === 6) {
      //if (isLoginFlow) {
        console.log('onLogin function');
        //setBtnLoader(true);

        await confirmLoginOtp(code)
          .then(async resp => {
            console.log("resp",resp)

            dispatch({
              type: actionTypeConstants.PROVIDER_DETAILS,
              payload: {
                ...resp?.attributes,
                isLoggedIn: true,
              },
            });


            props.navigation.navigate("Dashboard", {isLogin: true});
          })
          .catch(err => {
         
          });
         
  };
  
  return (
    <GuestLayout>
      <Hidden from="md">
        <Header />
      </Hidden>

      <Hidden till="md">
        <SideContainerWeb />
      </Hidden>
      <Box
        py={{ base: '8', md: '8' }}
        px={{ base: '4', md: '8' }}
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        flex="1"
        borderTopRightRadius={{ md: 'xl' }}
        borderBottomRightRadius={{ md: 'xl' }}
      >
        <VStack justifyContent="space-between" flex="1" space="24">
          <Box>
            <HStack space="2">
      
              <Input value={password}  onChangeText={(text)=>{
                console.log(text);
                setPassword(text)
              }}
              
              type={show ? "text" : "password"} w="75%" maxW="300px" py="0" InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" ></Button>} />
          
          <Button variant="solid" size="lg"   onPress={()=>onLogin(password)}  >
                          PROCEED
                        </Button>
              </HStack>
          </Box>
          <AccountLink />
        </VStack>
      </Box>
    </GuestLayout>
  );
}


function Header() {
  return (
    <HStack space="2" px="1" mt="4" mb="5" alignItems="center">
      <IconButton
        p={0}
        icon={
          <Icon
            alignItems="center"
            justifyContent="center"
            size="6"
            as={MaterialIcons}
            name="keyboard-backspace"
            color="coolGray.50"
          />
        }
        onPress={() => {
          // back button Logic
        }}
      />
      <Text color="coolGray.50" fontSize="lg">
        OTP Verification
      </Text>
    </HStack>
  );
}
function SideContainerWeb() {
  return (
    <Center
      flex="1"
      _light={{ bg: 'primary.900' }}
      _dark={{ bg: 'primary.700' }}
      px={{ base: '4', md: '8' }}
      borderTopLeftRadius={{ md: 'xl' }}
      borderBottomLeftRadius={{ md: 'xl' }}
    >
      <Image
        h="24"
        size="80"
        alt="NativeBase Startup+ "
        resizeMode={'contain'}
        source={require('../../assets/logo.png')}
      />
    </Center>
  );
}


function AccountLink() {
  return (
    <HStack
      mt="28"
      space="1"
      safeAreaBottom
      alignItems="center"
      justifyContent="center"
    >
      <Text
        _light={{ color: 'coolGray.800' }}
        _dark={{ color: 'coolGray.400' }}
        fontSize="sm"
        fontWeight="normal"
      >
        Already have an account?
      </Text>

      <Pressable>
        <Text
          fontWeight="bold"
          textDecoration="none"
          fontSize="sm"
          _light={{
            color: 'primary.900',
          }}
          _dark={{
            color: 'primary.500',
          }}
        >
          Sign In
        </Text>
      </Pressable>
    </HStack>
  );
}

function ResendLink() {
  return (
    <HStack>
      <Text
        _light={{ color: 'coolGray.800' }}
        _dark={{ color: 'coolGray.400' }}
        fontSize="sm"
      >
        Didn’t receive the OTP?{' '}
      </Text>
      <Pressable alignSelf="center">
        <Text
          _light={{ color: 'primary.900' }}
          _dark={{ color: 'primary.500' }}
          fontWeight="bold"
          textDecoration="none"
          fontSize="sm"
        >
          RESEND OTP
        </Text>
      </Pressable>
    </HStack>
  );
}
