import React, { useCallback, useEffect } from 'react';
import { Linking, StatusBar } from 'react-native';

import { useTheme, useTranslation } from '../hooks/';
import { Block, Button, Image, Text } from '../components/';

const Pro = () => {
  const { t } = useTranslation();
  const { assets, colors, gradients, sizes } = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  return (
    <Image
      background
      source={assets.background}
      padding={sizes.padding}
      style={{ flex: 1 }}>
      <Block safe justify="center">
        <Block card flex={0} padding={sizes.sm} marginBottom={sizes.sm}>
          <Text h4 center semibold marginBottom={sizes.sm}>
            Title
          </Text>

          <Text marginBottom={sizes.padding}>Title</Text>

          <Text semibold>Title</Text>
          <Text semibold>Title</Text>
          <Text semibold>Title</Text>

          <Text marginVertical={sizes.padding}>Title</Text>

          <Text>Title</Text>

          <Block
            row
            flex={0}
            justify="space-evenly"
            marginVertical={sizes.padding}>
            <Image
              source={assets.ios}
              color={colors.icon}
              style={{ height: 38, width: 82 }}
            />
            <Image
              source={assets.android}
              color={colors.icon}
              style={{ height: 38, width: 140 }}
            />
          </Block>

          <Button
            gradient={gradients.primary}
            onPress={() =>
              handleWebLink(
                'https://www.creative-tim.com/product/soft-ui-pro-react-native',
              )
            }>
            <Text white bold transform="uppercase">
              Title
            </Text>
          </Button>
        </Block>
      </Block>
    </Image>
  );
};

export default Pro;
