import React, { PureComponent, createRef } from 'react';
import { findNodeHandle, } from 'react-native';
import IOContext from './IOContext';
import IOManager from './IOManager';
const withIO = (ScrollableComponent) => {
    class IOScrollableComponent extends PureComponent {
        constructor(props) {
            super(props);
            this.handleContentSizeChange = (width, height) => {
                const { contentSize } = this.root.current;
                if (width !== contentSize.width || height !== contentSize.height) {
                    this.root.current.contentSize = { width, height };
                    if (width > 0 && height > 0 && this.root.onLayout) {
                        this.root.onLayout();
                    }
                }
                const { onContentSizeChange } = this.props;
                if (onContentSizeChange) {
                    onContentSizeChange(width, height);
                }
            };
            this.handleLayout = (event) => {
                const { nativeEvent: { layout }, } = event;
                const { layoutMeasurement } = this.root.current;
                if (layoutMeasurement.width !== layout.width ||
                    layoutMeasurement.height !== layout.height) {
                    this.root.current.layoutMeasurement = layout;
                }
                const { onLayout } = this.props;
                if (onLayout) {
                    onLayout(event);
                }
            };
            this.handleScroll = (event) => {
                this.root.current = event.nativeEvent;
                if (this.root.onScroll) {
                    this.root.onScroll(this.root.current);
                }
                const { onScroll } = this.props;
                if (onScroll) {
                    onScroll(event);
                }
            };
            this.scrollToEnd = (options) => {
                this.scroller.current?.scrollToEnd(options);
            };
            this.getScrollResponder = () => {
                return this.scroller.current?.getScrollResponder();
            };
            this.getScrollableNode = () => {
                return this.scroller.current?.getScrollableNode();
            };
            this.getInnerViewNode = () => {
                return this.scroller.current?.getInnerViewNode();
            };
            const self = this;
            this.scroller = createRef();
            this.root = {
                get node() {
                    return self.node;
                },
                get horizontal() {
                    return !!self.props.horizontal;
                },
                current: {
                    contentInset: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                    contentOffset: {
                        x: 0,
                        y: 0,
                    },
                    contentSize: {
                        width: 0,
                        height: 0,
                    },
                    layoutMeasurement: {
                        width: 0,
                        height: 0,
                    },
                    zoomScale: 1,
                },
            };
            const manager = new IOManager({
                root: this.root,
                get rootMargin() {
                    return self.props.rootMargin;
                },
            });
            this.manager = manager;
            this.contextValue = {
                manager,
            };
        }
        componentDidMount() {
            this.node = findNodeHandle(this.scroller.current);
        }
        scrollTo(y, x, animated) {
            this.scroller.current?.scrollTo(y, x, animated);
        }
        render() {
            return (React.createElement(IOContext.Provider, { value: this.contextValue },
                React.createElement(ScrollableComponent, Object.assign({ scrollEventThrottle: 16 }, this.props, { ref: this.scroller, onContentSizeChange: this.handleContentSizeChange, onLayout: this.handleLayout, onScroll: this.handleScroll }))));
        }
    }
    return IOScrollableComponent;
};
export default withIO;
