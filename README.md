# react-boilerplate

This boilerplate is a simple to-do task application that provides a modern React web application skeleton written in Typescript.

## Getting Started

Run the setup script
```bash
> ./setup.sh
```

## Configuration

This project utilizes [dotenv](https://npmjs.org/package/dotenv) to provide configuration via `process.env` at runtime. Any build scripts should populate this file during compilation.

## Building

This project provides a simple build script `build.sh` to generate the web application code in the `/dist` folder.
It also provides the option to generate GraphQL definitions from a server. See the `codegen.yml` file for more details.

## Running

```bash
> npm start
```

## Library Reference

#### Frameworks/UI
- [React](https://reactjs.org/)
- [Material UI](https://material-ui.com/)

#### State Management
- [Redux](https://redux.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Redux Observable](https://redux-observable.js.org/)

#### Navigation
- [React Router](https://reacttraining.com/react-router/)
- [Connected React Router](https://github.com/supasate/connected-react-router)

#### Service/API
- [Apollo GraphQL](https://www.apollographql.com/)
- [React Apollo](https://github.com/apollographql/react-apollo)

#### Build Tools
- [webpack](https://webpack.js.org/)
- [graphql-tag](https://github.com/apollographql/graphql-tag)
- [babel](https://babeljs.io/)
- [graphql-code-generator](https://graphql-code-generator.com/)
- [dotenv](https://github.com/motdotla/dotenv#readme)

#### Other
- [log4js2](https://github.com/log4js2)
