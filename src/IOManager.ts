import { Element } from './IntersectionObserver';

import IntersectionObserver, {
  IntersectionObserverOptions,
  IntersectionObserverEntry,
} from './IntersectionObserver';

export type ObserverInstanceCallback = (inView: boolean) => void;

export interface ObserverInstance {
  readonly callback: ObserverInstanceCallback;
  readonly element: Element;
  readonly observerId: number;
  readonly observer: IntersectionObserver;
}

class IOManager {
  io: IntersectionObserver;
  observerId: number;
  instanceMap: Map<Element, ObserverInstance> = new Map();

  constructor(options: IntersectionObserverOptions) {
    this.io = new IntersectionObserver(this.handleChange, options);
    this.observerId = 0;
  }

  handleChange = (entries: IntersectionObserverEntry[]) => {
    for (let index = 0; index < entries.length; index += 1) {
      const { target, isIntersecting } = entries[index];
      const instance = this.instanceMap.get(target);
      if (instance) {
        instance.callback(isIntersecting);
      }
    }
  };

  observe(
    element: Element,
    callback: ObserverInstanceCallback,
  ): ObserverInstance {
    const existInstance = this.instanceMap.get(element);
    if (existInstance) {
      return existInstance;
    }
    this.observerId += 1;
    const instance: ObserverInstance = {
      callback,
      element,
      observerId: this.observerId,
      observer: this.io,
    };
    this.instanceMap.set(element, instance);
    this.io.observe(element);
    return instance;
  }

  unobserve(element: any) {
    if (this.instanceMap.has(element)) {
      this.instanceMap.delete(element);
      this.io.unobserve(element);
    }
  }
}

export default IOManager;
