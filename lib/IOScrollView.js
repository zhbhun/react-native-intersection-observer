import { ScrollView } from 'react-native';
import withIO from './withIO';
const IOScrollView = withIO(ScrollView, [
    'scrollTo',
    'scrollToEnd',
    'getScrollResponder',
    'getScrollableNode',
    'getInnerViewNode',
]);
export default IOScrollView;
