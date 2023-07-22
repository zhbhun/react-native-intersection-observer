import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { IOComponentProps } from './withIO';
export type IOScrollViewController = ScrollView;
export type IOScrollViewProps = IOComponentProps & ScrollViewProps;
declare const _default: ForwardRefExoticComponent<IOComponentProps & ScrollViewProps & RefAttributes<ScrollView>>;
export default _default;
