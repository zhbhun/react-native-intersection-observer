import { FlatList } from 'react-native';

import withIntersectionObserver, { IOFlatList } from './withIOFlatList';

export default withIntersectionObserver(FlatList) as typeof IOFlatList;
