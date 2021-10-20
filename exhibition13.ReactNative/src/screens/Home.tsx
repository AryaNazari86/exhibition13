import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useData, useTheme, useTranslation } from '../hooks/';
import { Block, Button, Image, Input, Product, Text } from '../components/';
import { ActivityIndicator } from 'react-native';
const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [important, setImportant] = useState([]);
  const [latest, setLatest] = useState([]);
  const getArticles = async () => {
    try {
      const response = await fetch('http://192.168.0.147:8000/Article/HomeArticlesList/?format=json');
      const data = await response.json();
      var importantArticles = [];
      for (let i = 0; i < data.length; i++) {
        importantArticles.push(data[i].article)
      }
      setImportant(importantArticles);
      const response1 = await fetch('http://192.168.0.147:8000/Article/LatestArticlesList/?format=json');
      const data1 = await response1.json();
      setLatest(data1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const { following, trending } = useData();
  const [articles, setArticles] = useState([latest]);
  const { assets, colors, fonts, gradients, sizes } = useTheme();

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setArticles([important, latest][tab]);
    },
    [following, trending, setTab, setArticles],
  );



  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      </Block>

      {/* toggle products list */}
      <Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        paddingBottom={sizes.sm}>
        <Button onPress={() => handleProducts(0)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
              <Image source={assets.extras} color={colors.white} radius={0} />
            </Block>
            <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
              {t('home.following')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(1)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
              <Image
                radius={0}
                color={colors.white}
                source={assets.documentation}
              />
            </Block>
            <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
              {t('home.trending')}
            </Text>
          </Block>
        </Button>
      </Block>

      {/* products list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.l }}>
        <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
          {isLoading ? <ActivityIndicator /> : (articles?.map((article) => (
            <Block card marginTop={sizes.sm}>
              <Image
                resizeMode="cover"
                source={assets.important}
                style={{ width: '100%', height: 150, }}
              />
              <Text
                h5
                bold
                transform="uppercase"
                gradient={gradients.primary}
                marginTop={sizes.sm}>
                {article.title}
              </Text>
              <Text
                p
                marginTop={sizes.s}
                marginLeft={sizes.xs}
                marginBottom={sizes.sm}>
                The most beautiful and complex UI Kits built by Creative Tim.
              </Text>
              {/* user details */}
              <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
                <Image
                  source={assets.avatar2}
                  style={{ width: sizes.xl, height: sizes.xl, borderRadius: sizes.s }}
                />
                <Block marginLeft={sizes.s}>
                  <Text p semibold>
                    {article.user.username}
                  </Text>
                  <Text p gray>
                    Posted on 28 February
                  </Text>
                </Block>
              </Block>
            </Block>
          )))}
        </Block>
      </Block>
    </Block>
  );
};

export default Home;
