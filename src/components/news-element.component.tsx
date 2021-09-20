import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { theme } from "../theme/theme";
import { NewsType } from "../types/data.types";
import { NewsItemText } from "./news-item-text.component";
import { dateConverter } from "../utils/date-converter.util";

const { width } = Dimensions.get('window')

export const NewsElement: React.FC<NewsType> = React.memo(({karma, title, url, by, score, time}) => {
  return (
    <View style={styles.container}>
      <View>
        <NewsItemText style={styles.article} title={title} />
      </View>
      <View style={styles.mainContent}>
        <View style={styles.blockWrapper}>
          <NewsItemText title={'Url:'}>{!!url ? url : 'No URL to show'}</NewsItemText>
          <NewsItemText title={'Timestamp:'}>{dateConverter(time)}</NewsItemText>
          <NewsItemText title={'Author:'}>{by}</NewsItemText>
          <NewsItemText title={'Authors karma:'}>{karma}</NewsItemText>
        </View>
      </View>
      <View>
        <NewsItemText style={styles.score} title={'Score:'}>{score}</NewsItemText>
      </View>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    minHeight: width / 3.25,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: theme.size[1],
      height: theme.size[1]
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: theme.size[1],
    overflow: 'hidden',
    paddingVertical: theme.size[3],
    paddingHorizontal: theme.size[4],
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.cyan,
    marginBottom: theme.space[3]
  },
  mainContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "flex-start"
  },
  blockWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: theme.space[1]
  },
  article: {
    fontWeight: '700',
    fontSize: theme.fontSize.large,
    textAlign: 'center'
  },
  score: {
    fontWeight: '700'
  }
})
