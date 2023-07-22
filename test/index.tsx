import React, { useState } from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollViewTester from './ScrollViewTester';
import FlatListTester from './FlatListTester';

const demos = [
  {
    key: 'scrollview',
    title: 'ScrollView',
    content: <ScrollViewTester />,
  },
  {
    key: 'flatlist',
    title: 'FlatList',
    content: <FlatListTester />,
  },
];

const App = () => {
  const [active, setActive] = useState(demos[0]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {demos.map((demo) => {
          return (
            <TouchableOpacity key={demo.key} onPress={() => setActive(demo)}>
              <View style={styles.tab}>
                <Text
                  style={[
                    styles.tab__title,
                    demo === active && styles.tab__title_active,
                  ]}
                >
                  {demo.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.content}>{active.content}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab__title: {
    fontSize: 16,
  },
  tab__title_active: {
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});

AppRegistry.registerComponent('ReactNativeIntersectionObserver', () => App);
