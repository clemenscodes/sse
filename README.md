# Secure Software Engineering

## Developing

There are two helper scripts which can generate a new component or page in the ```libs/components``` or ```libs/pages``` libraries.

### Creating a new component

```sh
yarn component login-button
```

This will generate the ```LoginButton``` component as ```libs/components/src/login-button/login-button.tsx``` along with ```Jest``` test files and export it from the shared library.

Afterwards, you can use the component in all apps by importing it with:

```ts
import { LoginButton } from '@components';
```

### Creating a new page

```sh
yarn page dashboard
```

This will generate the ```Dashboard``` page as ```libs/pages/src/dashboard/Dashboard.tsx``` along with ```Jest``` test files and export it from the shared library.

Afterwards, you can use the page in all apps by importing it with:

```ts
import { Dashboard } from '@pages';
```
