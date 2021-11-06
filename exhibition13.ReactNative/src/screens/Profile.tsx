import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { Block, Button, Image, Text } from '../components/';
import { useData, useTheme, useTranslation } from '../hooks/';
import AsyncStorage from '@react-native-async-storage/async-storage';
const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;


  const [user, setUser] = useState({
    'name': 'ERROR',
    'username': 'ERROR',
    'bio': 'ERROR',
    'participated_class': 'ERROR',
    'avatar': 'ERROr'
  });
  const getProfileData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        const response = await fetch('http://192.168.0.147:8000/Account/Profile/', {
          method: 'post',
          body: JSON.stringify({
            'token': value
          })
        });
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.log("ARYA");

    }
  };
  const handleSocialLink = useCallback(
    (type: 'aparat' | 'bale') => {
      const url =
        type === 'aparat'
          ? `https://www.aparat.com/techno1400`
          : `https://ble.ir/techno1400`;

      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );

  getProfileData();

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{ rotate: '180deg' }]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('profile.title')}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Image
                width={64}
                height={64}
                marginBottom={sizes.sm}
                source={{ uri: 'http://192.168.0.147:8000' + user.avatar }}
              />
              <Text h5 center white>
                {user?.username}
              </Text>
              <Text p center white>
                {user?.name}
              </Text>
              <Block row marginVertical={sizes.m}>
                <Button
                  white
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  onPress={() => {
                    alert(`Follow ${user?.name}`);
                  }}>
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    color="rgba(255,255,255,0.2)">
                    <Text white bold transform="uppercase">
                      Techno
                    </Text>
                  </Block>
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  marginHorizontal={sizes.sm}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => handleSocialLink('aparat')}>
                  <Ionicons
                    size={18}
                    name="logo-whatsapp"
                    color={colors.white}
                  />
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => handleSocialLink('bale')}>
                  <Ionicons
                    size={18}
                    name="logo-youtube"
                    color={colors.white}
                  />
                </Button>
              </Block>
            </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Text bold transform="uppercase">
                {user.participated_class}
              </Text>
            </Block>
          </Block>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.aboutMe')}
            </Text>
            <Text p lineHeight={26}>
              {user?.bio}
            </Text>
          </Block>

          {/* profile: photo album */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                Picrues
              </Text>
            </Block>
            <Block row justify="space-between" wrap="wrap">
              <Image
                resizeMode="cover"
                source={assets.school}
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              />
              <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={assets.sampad}
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={assets.Sampad}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
