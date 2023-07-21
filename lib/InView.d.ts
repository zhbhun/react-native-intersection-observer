import React, { ComponentType, PureComponent, ReactElement, ReactNode, RefObject } from 'react';
import { LayoutChangeEvent, View, ViewProps } from 'react-native';
import { IOCOntextValue } from './IOContext';
import { Element } from './IntersectionObserver';
import { ObserverInstance } from './IOManager';
export interface RenderProps {
    inView: boolean;
    onChange: (inView: boolean) => void;
}
export interface Props {
    [key: string]: any;
}
export declare type InViewProps<T extends Props = Props> = T & {
    as?: ComponentType<any>;
    children: ReactNode | ((fields: RenderProps) => ReactElement<View>);
    triggerOnce?: boolean;
    onChange?: (inView: boolean) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
};
export declare type InViewWrapper = ComponentType<{
    ref?: RefObject<any> | ((ref: any) => void);
    onLayout?: (event: LayoutChangeEvent) => void;
}>;
declare class InView<T = ViewProps> extends PureComponent<InViewProps<T>> {
    static contextType: React.Context<IOCOntextValue>;
    static defaultProps: Partial<InViewProps>;
    context: undefined | IOCOntextValue;
    mounted: boolean;
    protected element: Element;
    protected instance: undefined | ObserverInstance;
    protected view: any;
    constructor(props: InViewProps<T>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected handleChange: (inView: boolean) => void;
    protected handleRef: (ref: any) => void;
    protected handleLayout: (event: LayoutChangeEvent) => void;
    measureInWindow: (...args: any) => void;
    measureLayout: (...args: any) => void;
    setNativeProps: (...args: any) => void;
    focus: (...args: any) => void;
    blur: (...args: any) => void;
    render(): JSX.Element | null;
}
export default InView;
