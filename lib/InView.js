import React, { PureComponent, } from 'react';
import { View } from 'react-native';
import IOContext from './IOContext';
class InView extends PureComponent {
    static contextType = IOContext;
    static defaultProps = {
        triggerOnce: false,
        as: View,
    };
    context = undefined;
    mounted = false;
    element;
    instance;
    view;
    constructor(props) {
        super(props);
        this.element = {
            inView: false,
            layout: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            measureLayout: this.measureLayout,
        };
    }
    componentDidMount() {
        this.mounted = true;
        if (this.context?.manager) {
            this.instance = this.context.manager.observe(this.element, this.handleChange);
        }
    }
    componentWillUnmount() {
        this.mounted = false;
        if (this.context?.manager && this.instance) {
            this.context.manager.unobserve(this.element);
        }
    }
    handleChange = (inView) => {
        if (this.mounted) {
            const { triggerOnce, onChange } = this.props;
            if (inView && triggerOnce) {
                if (this.context?.manager) {
                    this.context?.manager.unobserve(this.element);
                }
            }
            if (onChange) {
                onChange(inView);
            }
        }
    };
    handleRef = (ref) => {
        this.view = ref;
    };
    handleLayout = (event) => {
        const { nativeEvent: { layout }, } = event;
        if (layout.width !== this.element.layout.width ||
            layout.height !== this.element.layout.height) {
            if (this.element.onLayout) {
                this.element.onLayout();
            }
        }
        const { onLayout } = this.props;
        if (onLayout) {
            onLayout(event);
        }
    };
    measureInWindow = (...args) => {
        this.view.measureInWindow(...args);
    };
    measureLayout = (...args) => {
        this.view.measureLayout(...args);
    };
    setNativeProps = (...args) => {
        this.view.setNativeProps(...args);
    };
    focus = (...args) => {
        this.view.focus(...args);
    };
    blur = (...args) => {
        this.view.blur(...args);
    };
    render() {
        const { as, children, ...props } = this.props;
        if (typeof children === 'function') {
            return null;
        }
        const ViewComponent = (as || View);
        return (React.createElement(ViewComponent, { ...props, ref: this.handleRef, onLayout: this.handleLayout }, children));
    }
}
export default InView;
