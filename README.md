# React-without-__DEV__

### Goal

This repo is a fork of [React](https://facebook.github.io/react/). It's [prod-src](./prod-src) folder has a codebase almost the same as react [src](./src) but without the code that only run on development environment. It's goal is to help people learn how it works without understand a lot of debug instruments.

### How

It uses babel to execute [Dead Code Elimination](https://en.wikipedia.org/wiki/Dead_code_elimination) with `__DEV__=false`.

### Compare

- [114 __DEV__ code results](https://github.com/facebook/react/search?utf8=%E2%9C%93&q=__DEV__&type=) in facebook/react
- [0 __DEV__ code results](https://github.com/chentsulin/react-without-__DEV__/search?utf8=%E2%9C%93&q=__DEV__&type=) in here


### License

React is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).

React documentation is [Creative Commons licensed](./LICENSE-docs).

Examples provided in this repository and in the documentation are [separately licensed](./LICENSE-examples).
