# Website

This website is built using the canary release of [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation

```sh
yarn
```

### Local Development

```sh
yarn nx serve docs
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```sh
yarn nx build docs
```

### Importing workspace components

Due to the way docusaurus gets compiled, there are limitations on the module resolutions.
This limits importing components using path aliases and instead they have to be imported using full relative paths.
