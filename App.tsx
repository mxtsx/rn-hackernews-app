import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { News } from "./src/screens/news/news.component";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export const App: React.FC = React.memo(() => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <News />
        <StatusBar barStyle={"light-content"} />
      </SafeAreaView>
    </Provider>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
