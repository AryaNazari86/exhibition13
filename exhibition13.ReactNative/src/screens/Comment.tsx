import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useData, useTheme, useTranslation } from '../hooks/';
import { Block, Button, Image, Input, Product, Text } from '../components/';
import { ActivityIndicator } from 'react-native';
const Home = () => {
    const { t } = useTranslation();
    const { assets, colors, fonts, gradients, sizes } = useTheme();
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const submitComment = (title, comment) => {
        var data = new FormData();
        data.append('title', title);
        data.append('description', comment);
        data.append('user', '1');

        try {
            const response = fetch('http://192.168.0.147:8000/Comment/CommentList/?format=json',
                {
                    method: 'post',
                    body: data,
                }
            );
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }





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
                        <Button
                            row
                            flex={0}
                            justify="flex-start">
                            <Image
                                radius={0}
                                width={10}
                                height={18}
                                color={colors.white}
                                source={assets.arrow}
                                transform={[{ rotate: '180deg' }]}
                            />
                            <Text p white marginLeft={sizes.s}>
                                {t('common.goBack')}
                            </Text>
                        </Button>

                        <Text h4 center white marginBottom={sizes.md}>
                            Comments!
                        </Text>
                    </Image>
                </Block>
                {/* register form */}
                <Block
                    keyboard
                    marginTop={-(sizes.height * 0.2 - sizes.l)}>
                    <Block
                        flex={0}
                        radius={sizes.sm}
                        marginHorizontal="8%"
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
                            <Text p semibold center>
                                {t('register.subtitle')}
                            </Text>
                            {/* social buttons */}
                            <Block row center justify="space-evenly" marginVertical={sizes.m}>
                                <Button outlined gray >
                                    <Image
                                        source={assets.facebook}
                                        height={sizes.m}
                                        width={sizes.m}
                                    />
                                </Button>
                                <Button outlined gray >
                                    <Image
                                        source={assets.apple}
                                        height={sizes.m}
                                        width={sizes.m}
                                    />
                                </Button>
                                <Button outlined gray >
                                    <Image
                                        source={assets.google}
                                        height={sizes.m}
                                        width={sizes.m}
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
                                    label={'Title'}
                                    placeholder={'What is your comment about?'}
                                    onChangeText={(value) => { setTitle(value) }}
                                />
                                <Input
                                    autoCapitalize="none"
                                    marginBottom={sizes.m}
                                    padding={10}
                                    label={'Comment'}
                                    keyboardType="default"
                                    multiline
                                    placeholder={'What is your comment?'}
                                    onChangeText={(value) => { setComment(value) }}
                                />
                            </Block>

                            <Button
                                marginVertical={sizes.s}
                                marginHorizontal={sizes.sm}
                                gradient={gradients.primary}
                                onPress={() => { submitComment(title, comment) }}>
                                <Text bold white transform="uppercase">
                                    Send Comment!
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block >
    );
};

export default Home;
