import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { InView, IOFlatList, type IOFlatListController } from '../src';

const DATA = [
  {
    id: 1,
    title: 'First Item',
  },
  {
    id: 2,
    title: 'Second Item',
  },
  {
    id: 3,
    title: 'Third Item',
  },
  {
    id: 4,
    title: 'Four Item',
  },
  {
    id: 5,
    title: 'Five Item',
  },
  {
    id: 6,
    title: 'Six Item',
  },
  {
    id: 7,
    title: 'Seven Item',
  },
  {
    id: 8,
    title: 'Eight Item',
  },
  {
    id: 9,
    title: 'Nine Item',
  },
  {
    id: 10,
    title: 'Ten Item',
  },
];

type ItemProps = { id: number; title: string };

const Item = ({ id, title }: ItemProps) =>
  id === 6 ? (
    <InView
      style={styles.item}
      triggerOnce={false}
      onChange={(inView) => {
        console.warn(inView);
      }}
    >
      <Text style={styles.title}>{title}</Text>
    </InView>
  ) : (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const FlatListTester = () => {
  const flatListRef = useRef<IOFlatListController>(null);
  return (
    <IOFlatList
      ref={flatListRef}
      rootMargin={{ top: 0, bottom: 0 }}
      data={DATA}
      ListHeaderComponent={
        <View>
          <Text
            onPress={() => {
              flatListRef.current?.scrollToEnd();
            }}
          >
            Scroll to bottom
          </Text>
          <Text
            onPress={() => {
              flatListRef.current?.scrollToIndex({
                animated: true,
                index: 5,
              });
            }}
          >
            Scroll to 6
          </Text>
        </View>
      }
      ListFooterComponent={
        <Text
          onPress={() => {
            flatListRef.current?.scrollToOffset({
              animated: true,
              offset: 0,
            });
          }}
        >
          Scroll to bottom
        </Text>
      }
      renderItem={({ item }) => <Item id={item.id} title={item.title} />}
      keyExtractor={(item) => String(item.id)}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  title: {
    fontSize: 14,
  },
});

export default FlatListTester;
