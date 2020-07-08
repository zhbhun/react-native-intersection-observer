import React from 'react';
import { AppRegistry, StyleSheet, Text } from 'react-native';

import { InView, IOScrollView } from '../src';

const styles = StyleSheet.create({
  demo: {
    marginTop: 505,
    marginBottom: 1000,
    height: 100,
    backgroundColor: '#f00',
  },
});

const App = () => {
  return (
    <IOScrollView rootMargin={{ top: 0, bottom: 0 }}>
      <InView
        style={styles.demo}
        triggerOnce={false}
        onChange={(inView) => {
          console.warn(inView);
        }}>
        <Text>Hello World!</Text>
      </InView>
    </IOScrollView>
  );
};

AppRegistry.registerComponent('debug', () => App);
