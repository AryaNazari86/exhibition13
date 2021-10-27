import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { useData, useTheme, useTranslation } from '../hooks/';
import * as regex from '../constants/regex';
import { Block, Button, Input, Image, Text, Checkbox } from '../components/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';

export default function ArticlePreview(props) {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();
    let body = props.route.params.body;
    let title = props.route.params.title;
    var media = props.route.params.image;
    console.log(media);

    return (

        <Image
            background
            source={assets.background}
            padding={sizes.padding}
            style={{ flex: 1 }}>
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
                    Go Back
                </Text>
            </Button>
            <Block safe justify="center">
                <ScrollView>
                    <Block card flex={0} padding={sizes.sm} marginBottom={sizes.sm}>
                        <Text h4 center color={colors.link} marginBottom={sizes.md * 0.3} >
                            {title}
                        </Text>
                        <Image
                            source={{ uri: media }}
                            padding={sizes.sm}
                            radius={sizes.cardRadius}
                            height={sizes.height * 0.2}
                        ></Image>

                        <Text color={colors.link} size={15} marginTop={20}>
                            {body}
                        </Text>
                    </Block>
                </ScrollView>
            </Block>
        </Image>
    )
}
