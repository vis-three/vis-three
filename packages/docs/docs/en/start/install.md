# Installation

## Development Environment

`VIS-THREE` recommends using a development environment that supports `npm` and `ES modules`, as this setup has been
validated across numerous projects.

## Version

`VIS-THREE` is currently in rapid development and iteration. The current major version is `0.6`.

## Installing three.js

`VIS-THREE` depends on `three`, but does not enforce a specific version. The optimal version is the one used in the
official examples. Therefore, you should install `three` before installing `VIS-THREE`.

```
npm i three
npm i @types/three -D
```

::: tip
The current version of three.js used in all examples is `^0.141.0`—`npm i three@^0.141.0`
:::

## Installing VIS-THREE

The `VIS-THREE` framework is built through an assembly approach, integrating different components to create various engine
functionalities to meet different business needs.

The documentation will progressively guide readers through the assembly and construction model of `VIS-THREE`. Below, we
introduce the package structure and categories included in `VIS-THREE`.

### Core Engine

`@vis-three/core`

The core engine provides the foundational APIs for the assembly-based application logic and 3D engine. It is a
fundamental dependency for all packages.

### Plugins

`@vis-three/plugin-xxx`

Plugins add new features and capabilities to the engine. All official plugin packages start with `@vis-three/plugin-`.

### Strategies

`@vis-three/strategy-xxx`

Strategies are used to coordinate different plugin functionalities and capabilities to accomplish specific tasks or
business functions. All official strategy packages start with `@vis-three/strategy-`.

### Configuration Core

`@vis-three/middleware`

The Configuration Core builds on the core engine by integrating foundational logic and APIs for configuration-based
operations.

### Configuration Modules

`@vis-three/module-xxx`

Configuration Modules are logical modules that implement various `configuration` -> `instance` processes based on
different functional needs.

### Utility Tools

`@vis-three/convenient`

Utility Tools are a collection of practical tools extracted from official project activities.

### Utility Library

`@vis-three/utils`

The Utility Library is a code logic library that serves the entire `VIS-THREE` development.

### Derivative Libraries

`@vis-three/library-xxx`

Derivative Libraries are collections provided by the official team related to 3D applications, facilitating quick search
and integration. All official derivative libraries start with `@vis-three/library-`.

### Pre-configured Engines

`@vis-three/engine-xxx`

Pre-configured Engines are engines assembled by the official team for different application scenarios, allowing for
quick development and debugging. All official pre-configured engines start with `@vis-three/engine-`.

