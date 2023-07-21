/// <reference types="react" />
import IOManager from './IOManager';
export interface IOCOntextValue {
    manager: null | IOManager;
}
declare const IOContext: import("react").Context<IOCOntextValue>;
export default IOContext;
