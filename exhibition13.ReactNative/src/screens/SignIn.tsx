import React, { useCallback, useEffect, useState } from 'react';
import { InteractionManager, Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { useData, useTheme, useTranslation } from '../hooks/';
import * as regex from '../constants/regex';
import { Block, Button, Input, Image, Text, Checkbox } from '../components/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Value } from 'react-native-reanimated';
const isAndroid = Platform.OS === 'android';

interface IRegistration {
  username: string;
  password: string;
  agreed: boolean;
}

function SignIn() {
  const { isDark } = useData();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [registration, setRegistration] = useState<IRegistration>({
    username: '',
    password: '',
    agreed: false,
  });
  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({ ...state, ...value }));
    },
    [setRegistration],
  );

  const SignIn = async (username, password) => {
    if (username.length >= 5 || password.length >= 8) {
      var data = new FormData();
      data.append('username', 'AryaNazari86');
      data.append('password', "Arya1386");
      try {
        const response = await fetch('http://192.168.0.147:8000/Account/api-token-auth/',
          {
            method: 'post',
            body: data,
          }
        );
        await response.json().then(async (token) => {
          await AsyncStorage.setItem(
            'token',
            token.token
          );
          AsyncStorage.getItem('token').then((value) => {
            if (value != null) {
              console.log()
            }
          });

          navigation.navigate('Home');

        })
      } catch (error) {
        console.error(error);
      }
    }
  }



  InteractionManager.runAfterInteractions(() => {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        console.log(value);
        navigation.navigate('Home');
      }
    });
  })



  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{ zIndex: 0 }}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>

            <Text h4 center white marginBottom={sizes.md} marginTop={50}>
              {t('register.title')}
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid} onPress={() => { navigation.navigate('Register') }}>
                  <Text bold transform="uppercase">
                    {t('common.signup')}
                  </Text>
                  <Image
                    source={assets.sampad}
                    height={100}
                    width={100}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
              </Block>
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />
                <Text center marginHorizontal={sizes.s}>
                  {t('common.or')}
                </Text>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label="Username"
                  placeholder="Enter your Username"
                  success={Boolean(registration.username)}
                  danger={Boolean(registration.username)}
                  onChangeText={(value) => handleChange({ name: value })}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label="Password"
                  placeholder="Enter your Password"
                  onChangeText={(value) => handleChange({ password: value })}
                  success={Boolean(registration.password.length >= 8)}
                  danger={registration.password.length < 8 && registration.password.length > 0}
                />
              </Block>
              <Button
                primary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => SignIn(registration.username, registration.password)}>
                <Text bold primary transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );


};

export default SignIn;
