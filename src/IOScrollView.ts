import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import withIO, { IOComponentProps } from './withIO';

export type IOScrollViewController = ScrollView;

export type IOScrollViewProps = IOComponentProps & ScrollViewProps;

const IOScrollView = withIO(ScrollView, [
  'scrollTo',
  'scrollToEnd',
  'getScrollResponder',
  'getScrollableNode',
  'getInnerViewNode',
]);

export default IOScrollView as unknown as ForwardRefExoticComponent<
  IOScrollViewProps & RefAttributes<IOScrollViewController>
>;
