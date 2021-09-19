import React from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../theme/theme";

type PropsType = {
  title: string,
  children?: React.ReactNode,
  style?: {}
}

export const NewsItemText: React.FC<PropsType> = React.memo(({title, children, style}) => {
  return (
    <Text style={{ ...styles.textWrapper, ...style }}>
      <Text style={styles.title}>{title}</Text> {children}
    </Text>
  )
})

const styles = StyleSheet.create({
  textWrapper: {
    fontSize: theme.fontSize.medium,
    flexWrap: "wrap"
  },
  title: {
    fontWeight: '700'
  }
})

