import { FlatList } from 'react-native';
import withIO from './withIO';
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
export default IOFlatList;
