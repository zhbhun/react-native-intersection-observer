import throttle from 'lodash/throttle';
export const defaultRootMargin = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};
class IntersectionObserver {
    callback;
    options;
    targets;
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.targets = [];
        this.options.root.onLayout = this.handleLayout;
        this.options.root.onScroll = this.handleScroll;
    }
    measureTarget = (target) => {
        const rootNode = this.options.root.node;
        if (rootNode) {
            target.measureLayout(rootNode, (x, y, width, height) => {
                target.layout = {
                    x,
                    y,
                    width,
                    height,
                };
                this.handleScroll();
            });
        }
    };
    handleLayout = throttle(() => {
        for (let index = 0; index < this.targets.length; index += 1) {
            this.measureTarget(this.targets[index]);
        }
    }, 300, { leading: false, trailing: true });
    handleScroll = throttle(() => {
        const rootMargin = this.options?.rootMargin || defaultRootMargin;
        const { horizontal, current: { contentOffset, contentSize, layoutMeasurement, }, } = this.options.root;
        if (contentSize.width <= 0 ||
            contentSize.height <= 0 ||
            layoutMeasurement.width <= 0 ||
            layoutMeasurement.height <= 0) {
            return;
        }
        const contentOffsetWithLayout = horizontal
            ? contentOffset.x + layoutMeasurement.width
            : contentOffset.y + layoutMeasurement.height;
        const changedTargets = [];
        for (let index = 0; index < this.targets.length; index += 1) {
            const target = this.targets[index];
            const targetLayout = target.layout;
            if (!targetLayout ||
                targetLayout.width === 0 ||
                targetLayout.height === 0) {
                continue;
            }
            let isIntersecting = false;
            if (horizontal) {
                isIntersecting =
                    contentOffsetWithLayout + (rootMargin.right || 0) >=
                        targetLayout.x &&
                        contentOffset.x - (rootMargin.left || 0) <=
                            targetLayout.x + targetLayout.width;
            }
            else {
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
    }, 100, { leading: false, trailing: true });
    observe(target) {
        const index = this.targets.indexOf(target);
        if (index < 0) {
            target.onLayout = this.handleLayout;
            this.targets.push(target);
        }
    }
    unobserve(target) {
        const index = this.targets.indexOf(target);
        if (index >= 0) {
            target.onLayout = undefined;
            this.targets.splice(index, 1);
        }
    }
}
export default IntersectionObserver;
