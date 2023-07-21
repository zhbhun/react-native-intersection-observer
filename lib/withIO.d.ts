import { PureComponent } from 'react';
import { ScrollResponderMixin, ScrollView, ScrollViewComponent, ScrollViewProps } from 'react-native';
import { RootMargin } from './IntersectionObserver';
export interface IOScrollableComponentProps extends ScrollViewProps {
    rootMargin?: RootMargin;
}
export declare class IOScrollableComponent extends PureComponent<IOScrollableComponentProps> {
    scrollTo: ScrollView['scrollTo'];
    scrollToEnd: ScrollView['scrollToEnd'];
    getScrollResponder(): ScrollResponderMixin | undefined;
    getScrollableNode: ScrollView['getScrollableNode'];
    getInnerViewNode: ScrollView['getInnerViewNode'];
}
declare const withIO: (ScrollableComponent: typeof ScrollViewComponent) => typeof IOScrollableComponent;
export default withIO;
