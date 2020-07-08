import React, { PureComponent, RefObject, createRef } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewComponent,
  ScrollViewProps,
  findNodeHandle,
} from 'react-native';

import IOContext, { IOCOntextValue } from './IOContext';
import { Root, RootMargin } from './IntersectionObserver';
import IOManager from './IOManager';

interface IOScrollViewProps extends ScrollViewProps {
  rootMargin?: RootMargin;
}

export declare class IOScrollViewComponent extends PureComponent<
  IOScrollViewProps
> {}

export declare class IOScrollView extends IOScrollViewComponent {
  scrollTo: ScrollView['scrollTo'];
  scrollToEnd: ScrollView['scrollToEnd'];
  getScrollResponder: ScrollView['getScrollResponder'];
  getScrollableNode: ScrollView['getScrollableNode'];
  getInnerViewNode: ScrollView['getInnerViewNode'];
}

const withIO = (
  ScrollableComponent: typeof ScrollViewComponent,
): typeof IOScrollView => {
  class IOScrollableComponent extends PureComponent<IOScrollViewProps> {
    protected node: any;

    protected scroller: RefObject<ScrollView>;

    protected root: Root;

    protected manager: IOManager;

    protected contextValue: IOCOntextValue;

    constructor(props: IOScrollViewProps) {
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
      event: NativeSyntheticEvent<NativeScrollEvent>,
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
      animated?: boolean,
    ) {
      this.scroller.current?.scrollTo(y, x, animated);
    }

    public scrollToEnd = (options?: { animated: boolean }): void => {
      this.scroller.current?.scrollToEnd(options);
    };

    public getScrollResponder = (): JSX.Element => {
      return this.scroller.current?.getScrollResponder() as JSX.Element;
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
  return IOScrollableComponent;
};

export default withIO;
