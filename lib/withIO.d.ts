import { PureComponent } from 'react';
import { ScrollView, ScrollViewComponent, ScrollViewProps } from 'react-native';
import { RootMargin } from './IntersectionObserver';
interface IOScrollViewProps extends ScrollViewProps {
    rootMargin?: RootMargin;
}
export declare class IOScrollViewComponent extends PureComponent<IOScrollViewProps> {
}
export declare class IOScrollView extends IOScrollViewComponent {
    scrollTo: ScrollView['scrollTo'];
    scrollToEnd: ScrollView['scrollToEnd'];
    getScrollResponder: ScrollView['getScrollResponder'];
    getScrollableNode: ScrollView['getScrollableNode'];
    getInnerViewNode: ScrollView['getInnerViewNode'];
}
declare const withIO: (ScrollableComponent: typeof ScrollViewComponent) => typeof IOScrollView;
export default withIO;
