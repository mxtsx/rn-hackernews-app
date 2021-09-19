import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { NewsElement } from "../../components/news-element.component";
import { theme } from "../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  getErrorSelector,
  getIsLoadingSelector,
  getNewsIdsSelector,
  getNewsSelector
} from "../../redux/newsReducer/news.selector";
import { getNews, getNewsIds } from "../../redux/newsReducer/news.reducer";
import { wait } from "../../utils/timeout.util";
import { NewsType } from "../../types/data.types";
import { Error } from "../../components/error.component";

export const News: React.FC = React.memo(() => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const newsIds = useSelector(getNewsIdsSelector)
  const news = useSelector(getNewsSelector)
  const error = useSelector(getErrorSelector)
  const isLoading = useSelector(getIsLoadingSelector)

  const dispatch = useDispatch()

  const fetchIds = useCallback(() => {
    dispatch(getNewsIds())
  }, [news])

  const onRefreshHandler = useCallback(() => {
    setIsRefreshing(true)
    fetchIds()
    wait(2000).then(() => setIsRefreshing(false))
  }, [news])

  useEffect(() => {
    fetchIds()
  }, [])

  useEffect(() => {
    if(!!newsIds.length) {
      dispatch(getNews(newsIds))
    }
  }, [newsIds])

  if(isLoading && !isRefreshing) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={'large'} color={theme.colors.cyan} />
      </View>
    )
  }

  if(!!error) {
    return <Error error={error} handler={fetchIds} />
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshHandler}/>
      }>
      {news.map((n: NewsType) => <NewsElement key={n?.title} karma={n?.karma} title={n?.title} time={n?.time} by={n.by} id={n?.id} score={n?.score} url={n?.url} />)}
    </ScrollView>
  );
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.space[4],
    paddingBottom: theme.space[0],
    paddingVertical: theme.space[3]
  },
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
