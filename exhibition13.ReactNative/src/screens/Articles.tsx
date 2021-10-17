import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';

import { useData, useTheme } from '../hooks/';
import { IArticle, ICategory } from '../constants/types';
import { Block, Button, Article, Text } from '../components/';

const Articles = () => {
  const [selected, setSelected] = useState<ICategory>();
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { colors, gradients, sizes } = useTheme();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getArticles = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const articles = await response.json();
      setData(articles.movies);
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
      {/* categories list */}
      <Block color={colors.card} row flex={0} paddingVertical={sizes.padding}>
        <Block
          scroll
          horizontal
          renderToHardwareTextureAndroid
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: -sizes.padding, y: 0 }}>
          {categories?.map((category) => {
            const isSelected = category?.id === selected?.id;
            return (
              <Button
                radius={sizes.m}
                marginHorizontal={sizes.s}
                key={`category-${category?.id}}`}
                onPress={() => setSelected(category)}
                gradient={gradients?.[isSelected ? 'primary' : 'light']}>
                <Text
                  p
                  bold={isSelected}
                  white={isSelected}
                  black={!isSelected}
                  transform="capitalize"
                  marginHorizontal={sizes.m}>
                  {category?.name}
                </Text>
              </Button>
            );
          })}
        </Block>
      </Block>
      {isLoading ? <ActivityIndicator /> : (data?.map((article) => (
        <Text>A</Text>
      )))}
      <FlatList
        data={articles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        style={{ paddingHorizontal: sizes.padding }}
        contentContainerStyle={{ paddingBottom: sizes.l }}
        renderItem={({ item }) => <Text>A</Text>}
      />

    </Block>
  );
};

export default Articles;
