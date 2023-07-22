import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InView, IOScrollView, IOScrollViewController } from '../src';

function ScrollViewTester() {
  const scrollViewRef = useRef<IOScrollViewController>(null);
  return (
    <IOScrollView ref={scrollViewRef} rootMargin={{ top: 0, bottom: 0 }}>
      <Text
        onPress={() => {
          scrollViewRef.current?.scrollToEnd();
        }}
      >
        Scroll to bottom
      </Text>
      <View style={styles.prefix} />
      <InView
        style={styles.demo}
        triggerOnce={false}
        onChange={(inView) => {
          console.warn(inView);
        }}
      >
        <Text
          onPress={() => {
            scrollViewRef.current?.scrollToEnd();
          }}
        >
          Hello World!
        </Text>
      </InView>
      <View style={styles.suffix} />
      <Text
        onPress={() => {
          scrollViewRef.current?.scrollTo(0);
        }}
      >
        Scroll to top
      </Text>
    </IOScrollView>
  );
}

const styles = StyleSheet.create({
  prefix: {
    height: 1000,
  },
  demo: {
    height: 100,
    backgroundColor: '#f00',
  },
  suffix: {
    height: 1000,
  },
});

export default ScrollViewTester;
