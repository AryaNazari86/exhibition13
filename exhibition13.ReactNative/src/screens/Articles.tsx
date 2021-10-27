import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';


import { useData, useTheme, useTranslation } from '../hooks/';
import { IArticle, ICategory } from '../constants/types';
import { Block, Button, Image, Text, Input } from '../components/';
import { getAllArticles, getLatestArticles } from '../../services/articleServices';
import { NavigationContainer } from '@react-navigation/native';
const Articles = () => {
  const { assets, colors, gradients, sizes } = useTheme();
  const [selected, setSelected] = useState<ICategory>();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getArticles = async () => {
    try {
      const data2 = await getAllArticles();
      setData(data2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Block>

      <ScrollView>

        {/* search input */}
        <Block color={colors.card} flex={0} padding={sizes.padding}>
          <Input search placeholder={t('common.search')} />
        </Block>
        {isLoading ? <ActivityIndicator /> : (data?.map((article) => (
          <TouchableOpacity onPress={() => navigation.navigate('ArticlePreview', { body: article.body, video: article.video, image: article.image, title: article.title })}>
            < Block card padding={0} marginTop={sizes.sm} marginHorizontal={20} >
              <Image
                background
                resizeMode="cover"
                source={{ uri: article.image }}
                radius={sizes.cardRadius}>
                <Block color="rgba(0,0,0,0.3)" padding={sizes.padding}>
                  <Text h4 white marginBottom={sizes.sm}>
                    {article.title}
                  </Text>

                  {/* user details */}
                  <Block row marginLeft={sizes.xs} marginTop={sizes.xxl}>
                    <Image
                      source={{ uri: article.user.profile_picture }}
                      style={{
                        width: sizes.xl,
                        height: sizes.xl,
                        borderRadius: sizes.s,
                      }}
                    />
                    <Block marginLeft={sizes.s}>
                      <Text p white semibold>
                        {article.user.username}
                      </Text>
                      <Text p white>
                        {article.user.first_name + ' ' + article.user.last_name}
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </Image>
            </Block>
          </TouchableOpacity>

        )))
        }

      </ScrollView >


    </Block >
  );
};

export default Articles;
