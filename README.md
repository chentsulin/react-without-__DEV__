# React-without-__DEV__

### Goal

This repo is a fork of [React](https://facebook.github.io/react/). [prod-src](./prod-src) folder in the repo has a codebase almost the same as react [src](https://github.com/facebook/react/tree/master/src) but without the code that only run on development environment. It's goal is to help people learn how it works without the need of understanding a lot of debug instruments.

### How

It uses babel to execute [Dead Code Elimination](https://en.wikipedia.org/wiki/Dead_code_elimination) with `__DEV__=false`.

### Compare

- [114 __DEV__ code results](https://github.com/facebook/react/search?utf8=%E2%9C%93&q=__DEV__&type=) in react/src
- 0 __DEV__ code results in [prod-src](./prod-src)


### License

React is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).

React documentation is [Creative Commons licensed](./LICENSE-docs).

Examples provided in this repository and in the documentation are [separately licensed](./LICENSE-examples).
