import { RefAttributes } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { IOComponentProps } from './withIO';
export type IOFlatListController = FlatList;
export type IOFlatListProps<ItemT = any> = IOComponentProps & FlatListProps<ItemT>;
declare function IOFlatListFunction<ItemT = any>(props: IOFlatListProps<ItemT> & RefAttributes<IOFlatListController>): JSX.Element;
declare const _default: typeof IOFlatListFunction;
export default _default;
