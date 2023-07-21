import { ScrollView } from 'react-native';

import withIntersectionObserver, {
  type IOScrollableComponent,
  type IOScrollableComponentProps,
} from './withIO';

export type IOScrollViewProps = IOScrollableComponentProps;

export default withIntersectionObserver(
  ScrollView
) as typeof IOScrollableComponent;
