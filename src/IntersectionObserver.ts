import { LayoutRectangle, NativeScrollEvent } from 'react-native';
import throttle from 'lodash/throttle';

export interface Root {
  horizontal: boolean;
  current: NativeScrollEvent;
  onScroll?: (event: NativeScrollEvent) => void;
}

export interface Element {
  inView: boolean;
  layout: LayoutRectangle;
  onLayout?: (event: LayoutRectangle) => void;
}

export interface IntersectionObserverEntry {
  target: Element;
  isIntersecting: boolean;
}

export interface RootMargin {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export interface IntersectionObserverOptions {
  root: Root;
  rootMargin?: RootMargin;
}

export type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
) => void;

export const defaultRootMargin: RootMargin = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

class IntersectionObserver {
  protected callback: IntersectionObserverCallback;
  protected options: IntersectionObserverOptions;
  protected targets: Element[];

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverOptions,
  ) {
    this.callback = callback;
    this.options = options;
    this.targets = [];
    this.options.root.onScroll = this.refresh;
  }

  public refresh = throttle(() => {
    const rootMargin = this.options?.rootMargin || defaultRootMargin;
    const {
      horizontal,
      current: {
        contentOffset, // 偏移量
        contentSize,
        layoutMeasurement, // 布局大小
      },
    } = this.options.root;
    if (
      contentSize.width <= 0 ||
      contentSize.height <= 0 ||
      layoutMeasurement.width <= 0 ||
      layoutMeasurement.height <= 0
    ) {
      return;
    }
    const contentOffsetWithLayout = horizontal
      ? contentOffset.x + layoutMeasurement.width
      : contentOffset.y + layoutMeasurement.height;
    const changedTargets: IntersectionObserverEntry[] = [];
    for (let index = 0; index < this.targets.length; index += 1) {
      const target = this.targets[index];
      const targetLayout: LayoutRectangle = target.layout;
      if (
        !targetLayout ||
        targetLayout.width === 0 ||
        targetLayout.height === 0
      ) {
        break;
      }
      let isIntersecting = false;
      if (horizontal) {
        isIntersecting =
          contentOffsetWithLayout + (rootMargin.right || 0) >= targetLayout.x &&
          contentOffset.x - (rootMargin.left || 0) <=
            targetLayout.x + targetLayout.width;
      } else {
        isIntersecting =
          contentOffsetWithLayout + (rootMargin.bottom || 0) >=
            targetLayout.y &&
          contentOffset.y - (rootMargin.top || 0) <=
            targetLayout.y + targetLayout.height;
      }
      if (target.inView !== isIntersecting) {
        target.inView = isIntersecting;
        changedTargets.push({
          target,
          isIntersecting,
        });
      }
    }
    this.callback(changedTargets);
  }, 100); // TODO: 优化节流

  public observe(target: Element) {
    const index = this.targets.indexOf(target);
    if (index < 0) {
      target.onLayout = this.refresh;
      this.targets.push(target);
    }
  }

  public unobserve(target: Element) {
    const index = this.targets.indexOf(target);
    if (index >= 0) {
      target.onLayout = undefined;
      this.targets.splice(index, 1);
    }
  }
}

export default IntersectionObserver;
