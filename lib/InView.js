import React, { PureComponent, } from 'react';
import { View } from 'react-native';
import IOContext from './IOContext';
class InView extends PureComponent {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.handleChange = (inView) => {
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
        this.handleRef = (ref) => {
            this.view = ref;
        };
        this.handleLayout = (event) => {
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
        this.measureInWindow = (...args) => {
            this.view.measureInWindow(...args);
        };
        this.measureLayout = (...args) => {
            this.view.measureLayout(...args);
        };
        this.setNativeProps = (...args) => {
            this.view.setNativeProps(...args);
        };
        this.focus = (...args) => {
            this.view.focus(...args);
        };
        this.blur = (...args) => {
            this.view.blur(...args);
        };
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
    render() {
        const { as, children, ...props } = this.props;
        if (typeof children === 'function') {
            return null;
        }
        const ViewComponent = (as || View);
        return (React.createElement(ViewComponent, Object.assign({}, props, { ref: this.handleRef, onLayout: this.handleLayout }), children));
    }
}
InView.contextType = IOContext;
InView.defaultProps = {
    triggerOnce: false,
    as: View,
};
export default InView;
