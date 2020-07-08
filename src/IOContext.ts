import { createContext } from 'react';

import IOManager from './IOManager';

export interface IOCOntextValue {
  manager: null | IOManager;
}

const IOContext = createContext<IOCOntextValue>({
  manager: null,
});

export default IOContext;
