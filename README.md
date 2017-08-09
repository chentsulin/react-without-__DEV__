# React-without-__DEV__

### Goal

This repo is a fork of [React](https://facebook.github.io/react/). It's [prod-src](./prod-src) folder has a codebase almost the same as react [src](./src) but without the code that only run on development environment. It's goal is to help people learn how it works without understand a lot of debug instruments.

### How

It uses babel to execute [Dead Code Elimination](https://en.wikipedia.org/wiki/Dead_code_elimination) with `__DEV__=false`.

### License

React is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).

React documentation is [Creative Commons licensed](./LICENSE-docs).

Examples provided in this repository and in the documentation are [separately licensed](./LICENSE-examples).
