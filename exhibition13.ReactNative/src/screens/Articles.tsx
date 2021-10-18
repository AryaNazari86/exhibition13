import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, ScrollView } from 'react-native';

import { useData, useTheme } from '../hooks/';
import { IArticle, ICategory } from '../constants/types';
import { Block, Button, Image, Text } from '../components/';

const Articles = () => {
  const { assets, colors, gradients, sizes } = useTheme();
  const [selected, setSelected] = useState<ICategory>();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getArticles = async () => {
    try {
      const response = await fetch('http://192.168.0.147:8000/Article/ArticleList/?format=json');
      const articles = await response.json();
      setData(articles);
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
        {isLoading ? <ActivityIndicator /> : (data?.map((article) => (

          < Block card padding={0} marginTop={sizes.sm} marginHorizontal={20}>
            <Image
              background
              resizeMode="cover"
              source={{ uri: article.image }}
              radius={sizes.cardRadius}>
              <Block color="rgba(0,0,0,0.3)" padding={sizes.padding}>
                <Text h4 white marginBottom={sizes.sm}>
                  {article.title}
                </Text>
                <Text p white>
                  Rather than worrying about switching offices every couple years,
                  you can instead stay in the same location.
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

        )))
        }
      </ScrollView >


    </Block >
  );
};

export default Articles;
