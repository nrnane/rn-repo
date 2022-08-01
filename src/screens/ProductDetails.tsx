import React, { useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Image,
  ScrollView,
  Pressable,
  Button,
  Stack,
  Link,
  Hidden,
  IconButton,
  useColorModeValue,
} from 'native-base';
import type { ImageSourcePropType } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DashboardLayout from '../../layouts/DashboardLayout';

import useSignUpHook from '../actions/useSignUpHook';
import {StoreContext} from '../journeys/context/JourneyContext';

import {useContextSelector} from '@fluentui/react-context-selector';
import actionTypeConstants from '../reducers/actionTypeConstants';


export default function () {
  const providerData: any = useContextSelector(
    StoreContext,
    store => store?.appState?.userInfo,
  );

  return (
    <DashboardLayout
      title="Body Suit"
      displaySidebar={false}
      header={{ searchbar: false }}
    >
      <ScrollView bounces={false}>
        <Stack
          px={{ base: '4', md: '8' }}
          py={{ base: '5', md: '8' }}
          flex={1}
          rounded={{ md: 'sm' }}
          _light={{ bg: 'white' }}
          _dark={{ bg: 'coolGray.800' }}
          direction={{ base: 'column', md: 'row' }}
        >
         
        </Stack>
      </ScrollView>
    </DashboardLayout>
  );
}
