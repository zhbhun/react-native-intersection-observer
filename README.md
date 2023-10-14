# react-native-intersection-observer

React Native implementation of the
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
to tell you when an element enters or leaves the viewport.

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add react-native-intersection-observer
```

or NPM:

```sh
npm install react-native-intersection-observer --save
```

## Usage

You can pass any component to the `<InView />`, and it will handle creating the
wrapping View component. Add a handler to the `onChange` method, and control the
state in your own component. Any extra props you add to `<InView>` will be
passed to the View component, allowing you to set the `style`, etc.

```tsx
import React, { useRef } from 'react';
import { Text } from 'react-native';
import {
  IOScrollView,
  IOScrollViewController,
  InView,
} from 'react-native-intersection-observer';

function Demo() {
  const scrollViewRef = useRef<IOScrollViewController>(null);
  return (
    <IOScrollView ref={scrollViewRef}>
      <Text
        onPress={() => {
          scrollViewRef.current?.scrollToEnd();
        }}
      >
        Scroll to bottom
      </Text>
      <InView onChange={(inView: boolean) => console.log('Inview:', inView)}>
        <Text>
          Plain children are always rendered. Use onChange to monitor state.
        </Text>
      </InView>
    </IOScrollView>
  );
}

export default Demo;
```

Please note that the functionality of the InView component is dependent on the use of the withIO higher-order component to wrap your scrollable component. The react-native-intersection-observer library presently offers two frequently used scrollable components: IOScrollView and IOFlatList. It's imperative to utilize the InView component within one of these two components for it to work as intended. If neither IOScrollView nor IOFlatList suits your requirements, you have the flexibility to employ withIO to encapsulate your custom scrollable components.

```tsx
// IOScrollView definition
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { type IOComponentProps, withIO } from 'react-native-intersection-observer';

export type IOScrollViewController = ScrollView;

export type IOScrollViewProps = IOComponentProps & ScrollViewProps;

const IOScrollView = withIO(ScrollView, [
  'scrollTo',
  'scrollToEnd',
  'getScrollResponder',
  'getScrollableNode',
  'getInnerViewNode',
]);

export default IOScrollView as unknown as ForwardRefExoticComponent<
  IOScrollViewProps & RefAttributes<IOScrollViewController>
>;
```

Furthermore, InView cannot be used within nested scrollable components. It solely monitors the immediate parent's scroll behavior, and scrolling at higher ancestral levels does not trigger InView's visibility callback.

## API

### IOScrollView

- Props: Inherits [ScrollView Props](https://reactnative.dev/docs/scrollview#props)

  | Name | Type | Default | Required | Description |
  | --- | --- | --- | --- | --- |
  | [rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) | { top: number; left: number; right: number; bottom: number } | undefined | false | root margin |

- Methods: Inherits [ScrollView Methods](https://reactnative.dev/docs/scrollview#methods)

### IOFlatList Props

- Props: Inherits [FlatList Props](https://reactnative.dev/docs/flatlist#props)

  | Name | Type | Default | Required | Description |
  | --- | --- | --- | --- | --- |
  | [rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) | { top: number; left: number; right: number; bottom: number } | undefined | false | root margin |

- Methods: Inherits [FlatList Methods](https://reactnative.dev/docs/flatlist#methods)

### InView Props

The **`<InView />`** component also accepts the following props:

| Name | Type | Default | Required | Description |
| -- | --- | --- | --- | --- |
| **as** | `ComponentType` | View   | false    | Render the wrapping element as this element. Defaults to `View`. |
| **children** | `ReactNode` | | true | Children expects a plain child, to have the `<InView />` deal with the wrapping element. |
| **triggerOnce** | boolean | false | false | Only trigger this method once |
| **onChange** | `(inView: boolean) => void` | | false | Call this function whenever the in view state changes. It will receive the `inView` boolean, alongside the current `IntersectionObserverEntry`. |

## License
`react-native-intersection-observer` is [MIT licensed](./LICENSE).
