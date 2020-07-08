import { ScrollView } from 'react-native';

import withIntersectionObserver, { IOScrollView } from './withIO';

export default withIntersectionObserver(ScrollView) as typeof IOScrollView;
