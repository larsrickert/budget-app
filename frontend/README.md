# Vue.js TypeScript Template 🚀

This template is based on the official vue starter app but is extended by common libraries:

- [Pinia](https://pinia.vuejs.org)
- [Vue I18n](https://vue-i18n.intlify.dev)
- [Sass](https://sass-lang.com)
- [Semantic release](https://semantic-release.gitbook.io/semantic-release) for automated GitHub releases and changelogs.
- Linting and formatting before committing

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

### Install dependencies

```sh
npm ci
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint and fix file with [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

```sh
npm run lint
```

## Type Support for `.vue` Imports in TS with VS Code

TypeScript cannot handle type information for `.vue` imports by default. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

But its recommended to use Volar's [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) because it is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Open VS Code extensions
   2. Enter `@builtin typescript` in search box, find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload VS Code

## Deploying for production with Docker

To start the application for production using Docker, just run

```sh
docker-compose up -d
```
