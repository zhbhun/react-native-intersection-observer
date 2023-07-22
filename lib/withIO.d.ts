import { type ComponentProps } from 'react';
import { ScrollView } from 'react-native';
import { RootMargin } from './IntersectionObserver';
export interface IOComponentProps {
    rootMargin?: RootMargin;
}
declare function withIO<CompProps extends Pick<ComponentProps<typeof ScrollView>, 'horizontal' | 'scrollEventThrottle' | 'onContentSizeChange' | 'onLayout' | 'onScroll'>>(Comp: new (props: CompProps) => any, methods: string[]): new (props: CompProps) => any;
export default withIO;
