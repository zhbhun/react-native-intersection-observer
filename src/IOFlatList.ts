import { RefAttributes } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import withIO, { IOComponentProps } from './withIO';

export type IOFlatListController = FlatList;

export type IOFlatListProps<ItemT = any> = IOComponentProps &
  FlatListProps<ItemT>;

const IOFlatList = withIO(FlatList, [
  'flashScrollIndicators',
  'getNativeScrollRef',
  'getScrollResponder',
  'getScrollableNode',
  'scrollToEnd',
  'scrollToIndex',
  'scrollToItem',
  'scrollToOffset',
]);

declare function IOFlatListFunction<ItemT = any>(
  props: IOFlatListProps<ItemT> & RefAttributes<IOFlatListController>
): JSX.Element;

export default IOFlatList as unknown as typeof IOFlatListFunction;
