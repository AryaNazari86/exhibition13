import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';
import { Block, Text, Switch, Button, Image } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';
import { ICONS } from '../constants/theme';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const { colors } = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale: scale }],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { isDark, handleIsDark } = useData();
  const [active, setActive] = useState('Home');
  const { assets, colors, gradients, sizes } = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  // screen list for Drawer menu
  const screens = [
    { name: t('screens.home'), to: 'Home', icon: assets.home },
    { name: t('screens.articles'), to: 'Articles', icon: assets.document },
    { name: 'Comment', to: 'Comment', icon: assets.payment },
    { name: t('screens.profile'), to: 'Profile', icon: assets.profile },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{ paddingBottom: sizes.padding }}>
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={33}
            height={33}
            source={ICONS.sampad}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={14} semibold>
              Exhibition 13
            </Text>
            <Text size={12} semibold>
              Techno Group
            </Text>
          </Block>
        </Block>

        {screens?.map((screen, index) => {
          const isActive = active === screen.to;

          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}>
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? 'primary' : 'white']}>
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? 'white' : 'black']}
                />
              </Block>
              <Text p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        <Button
          row
          justify="flex-start"
          marginBottom={sizes.s}
          onPress={() => { AsyncStorage.removeItem('token', (error) => console.log('error')); navigation.navigate('SignIn') }}>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.close}
            />
          </Block>
          <Text p color={labelColor}>
            Logout
          </Text>
        </Button>

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />

        <Text semibold transform="uppercase" opacity={0.5}>
          Candidates
        </Text>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink('https://github.com/creativetimofficial')
          }>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.settings}
            />
          </Block>
          <Text p color={labelColor}>
            Mohammad Hajikandi
          </Text>
        </Button>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink('https://github.com/creativetimofficial')
          }>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.office}
            />
          </Block>
          <Text p color={labelColor}>
            Arya Nazari
          </Text>
        </Button>
        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink('https://github.com/creativetimofficial')
          }>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.star}
            />
          </Block>
          <Text p color={labelColor}>
            Ilia Soleimani
          </Text>
        </Button>
        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink('https://github.com/creativetimofficial')
          }>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.users}
            />
          </Block>
          <Text p color={labelColor}>
            Amirsaleh Dehghan
          </Text>
        </Button>
        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink('https://github.com/creativetimofficial')
          }>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.documentation}
            />
          </Block>
          <Text p color={labelColor}>
            Mani Soori
          </Text>
        </Button>



      </Block>
    </DrawerContentScrollView >
  );
};

/* drawer menu navigation */
export default () => {
  const { gradients } = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: '60%',
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};
