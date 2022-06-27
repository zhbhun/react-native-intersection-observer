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

```jsx
import { IOScrollView, InView } from 'react-native-intersection-observer'

const Component = () => (
  <IOScrollView>
    <InView onChange={(inView: boolean) => console.log('Inview:', inView)}>
      <Text>Plain children are always rendered. Use onChange to monitor state.</Text>
    </InView>
  </IOScrollView>  
)

export default Component
```

## API

### IOScrollView Props

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| rootMargin | { top: number; left: number; right: number; bottom: number } | undefined | false | root margin |

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
