import React, { PureComponent, createRef, } from 'react';
import { findNodeHandle, } from 'react-native';
import IOContext from './IOContext';
import IOManager from './IOManager';
function withIO(Comp, methods) {
    const IOScrollableComponent = class extends PureComponent {
        node;
        scroller;
        root;
        manager;
        contextValue;
        constructor(props) {
            super(props);
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
            methods.forEach((method) => {
                this[method] = (...args) => {
                    this.scroller.current?.[method]?.(...args);
                };
            });
        }
        handleContentSizeChange = (width, height) => {
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
        handleLayout = (event) => {
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
        handleScroll = (event) => {
            this.root.current = event.nativeEvent;
            if (this.root.onScroll) {
                this.root.onScroll(this.root.current);
            }
            const { onScroll } = this.props;
            if (onScroll) {
                onScroll(event);
            }
        };
        render() {
            return (React.createElement(IOContext.Provider, { value: this.contextValue },
                React.createElement(Comp, { scrollEventThrottle: 16, ...this.props, ref: this.scroller, onContentSizeChange: this.handleContentSizeChange, onLayout: this.handleLayout, onScroll: this.handleScroll })));
        }
    };
    return IOScrollableComponent;
}
export default withIO;
