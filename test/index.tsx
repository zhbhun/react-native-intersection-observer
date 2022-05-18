import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import { InView, IOScrollView } from '../src';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 800,
    marginBottom: 1000,
  },
  demo: {
    height: 100,
    backgroundColor: '#f00',
  },
});

const App = () => {
  return (
    <IOScrollView rootMargin={{ top: 0, bottom: 0 }}>
      <View style={styles.wrapper}>
        <InView
          style={styles.demo}
          triggerOnce={false}
          onChange={(inView) => {
            console.warn(inView);
          }}
        >
          <Text>Hello World!</Text>
        </InView>
      </View>
    </IOScrollView>
  );
};

AppRegistry.registerComponent('ReactNativeIntersectionObserver', () => App);
