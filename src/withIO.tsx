import React, { PureComponent, RefObject, createRef } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollResponderMixin,
  ScrollView,
  ScrollViewComponent,
  ScrollViewProps,
  findNodeHandle,
} from 'react-native';

import IOContext, { IOCOntextValue } from './IOContext';
import { Root, RootMargin } from './IntersectionObserver';
import IOManager from './IOManager';

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

const withIO = (
  ScrollableComponent: typeof ScrollViewComponent
): typeof IOScrollableComponent => {
  class IOScrollView extends PureComponent<IOScrollableComponentProps> {
    protected node: any;

    protected scroller: RefObject<ScrollView>;

    protected root: Root;

    protected manager: IOManager;

    protected contextValue: IOCOntextValue;

    constructor(props: IOScrollableComponentProps) {
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
    }

    protected handleContentSizeChange = (width: number, height: number) => {
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

    protected handleLayout = (event: LayoutChangeEvent) => {
      const {
        nativeEvent: { layout },
      } = event;
      const { layoutMeasurement } = this.root.current;
      if (
        layoutMeasurement.width !== layout.width ||
        layoutMeasurement.height !== layout.height
      ) {
        this.root.current.layoutMeasurement = layout;
      }
      const { onLayout } = this.props;
      if (onLayout) {
        onLayout(event);
      }
    };

    protected handleScroll = (
      event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
      this.root.current = event.nativeEvent;
      if (this.root.onScroll) {
        this.root.onScroll(this.root.current);
      }
      const { onScroll } = this.props;
      if (onScroll) {
        onScroll(event);
      }
    };

    public scrollTo(
      y?: number | { x?: number; y?: number; animated?: boolean },
      x?: number,
      animated?: boolean
    ) {
      this.scroller.current?.scrollTo(y, x, animated);
    }

    public scrollToEnd = (options?: { animated: boolean }): void => {
      this.scroller.current?.scrollToEnd(options);
    };

    public getScrollResponder = (): ScrollResponderMixin | undefined => {
      return this.scroller.current?.getScrollResponder();
    };

    public getScrollableNode = (): any => {
      return this.scroller.current?.getScrollableNode();
    };

    public getInnerViewNode = (): any => {
      return this.scroller.current?.getInnerViewNode();
    };

    render() {
      return (
        <IOContext.Provider value={this.contextValue}>
          <ScrollableComponent
            scrollEventThrottle={16}
            {...this.props}
            ref={this.scroller}
            onContentSizeChange={this.handleContentSizeChange}
            onLayout={this.handleLayout}
            onScroll={this.handleScroll}
          />
        </IOContext.Provider>
      );
    }
  }
  return IOScrollView;
};

export default withIO;
