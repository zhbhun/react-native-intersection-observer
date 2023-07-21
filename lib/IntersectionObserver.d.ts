import { LayoutRectangle, NativeScrollEvent } from 'react-native';
export interface Root {
    node: any;
    horizontal: boolean;
    current: NativeScrollEvent;
    onLayout?: () => void;
    onScroll?: (event: NativeScrollEvent) => void;
}
export interface Element {
    inView: boolean;
    layout: LayoutRectangle;
    measureLayout: (node: any, callback: (x: number, y: number, width: number, height: number) => void) => void;
    onLayout?: () => void;
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
export declare type IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => void;
export declare const defaultRootMargin: RootMargin;
declare class IntersectionObserver {
    protected callback: IntersectionObserverCallback;
    protected options: IntersectionObserverOptions;
    protected targets: Element[];
    constructor(callback: IntersectionObserverCallback, options: IntersectionObserverOptions);
    protected measureTarget: (target: Element) => void;
    protected handleLayout: any;
    protected handleScroll: any;
    observe(target: Element): void;
    unobserve(target: Element): void;
}
export default IntersectionObserver;
