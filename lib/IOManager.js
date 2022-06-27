import IntersectionObserver from './IntersectionObserver';
class IOManager {
    constructor(options) {
        this.instanceMap = new Map();
        this.handleChange = (entries) => {
            for (let index = 0; index < entries.length; index += 1) {
                const { target, isIntersecting } = entries[index];
                const instance = this.instanceMap.get(target);
                if (instance) {
                    instance.callback(isIntersecting);
                }
            }
        };
        this.io = new IntersectionObserver(this.handleChange, options);
        this.observerId = 0;
    }
    observe(element, callback) {
        const existInstance = this.instanceMap.get(element);
        if (existInstance) {
            return existInstance;
        }
        this.observerId += 1;
        const instance = {
            callback,
            element,
            observerId: this.observerId,
            observer: this.io,
        };
        this.instanceMap.set(element, instance);
        this.io.observe(element);
        return instance;
    }
    unobserve(element) {
        if (this.instanceMap.has(element)) {
            this.instanceMap.delete(element);
            this.io.unobserve(element);
        }
    }
}
export default IOManager;
