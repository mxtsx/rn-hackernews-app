import React from "react";
import { Button, StyleSheet, View, Text, Dimensions } from "react-native";
import { theme } from "../theme/theme";

const { width } = Dimensions.get('window')

type PropsType = {
  error: string,
  handler: () => void
}

export const Error: React.FC<PropsType> = ({error, handler}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button title={'Try again'} onPress={handler}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentWrapper: {
    height: width / 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  errorText: {
    fontSize: theme.fontSize.larger
  },
  buttonWrapper: {
    width: width / 4
  }
})
