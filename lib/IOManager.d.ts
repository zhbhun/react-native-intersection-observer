import { Element } from './IntersectionObserver';
import IntersectionObserver, { IntersectionObserverOptions, IntersectionObserverEntry } from './IntersectionObserver';
export declare type ObserverInstanceCallback = (inView: boolean) => void;
export interface ObserverInstance {
    readonly callback: ObserverInstanceCallback;
    readonly element: Element;
    readonly observerId: number;
    readonly observer: IntersectionObserver;
}
declare class IOManager {
    io: IntersectionObserver;
    observerId: number;
    instanceMap: Map<Element, ObserverInstance>;
    constructor(options: IntersectionObserverOptions);
    handleChange: (entries: IntersectionObserverEntry[]) => void;
    observe(element: Element, callback: ObserverInstanceCallback): ObserverInstance;
    unobserve(element: any): void;
}
export default IOManager;
