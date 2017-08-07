# Introduction to Redux for beginners

## Table of contents

* [Overview](#overview)
* [What is Redux](#what-is-redux)
* [Installation](#installation)
  * [System Requirements](#system-requirements)
  * [Recommended Tools](#recommended-tools)
* [Setup](#setup)
* [Core Concepts](#core-concepts)
  * [Actions](#actions)
  * [Creating Actions](#creating-actions)
  * [Action Creators](#action-creators)
  * [Defining Action Creators](#defining-action-creators)
  * [Reducers](#reducers)
  * [Creating Reducers](#creating-reducers)
  * [Store](#store)
  * [Creating the Store](#creating-the-store)
* [Data Flow](#data-flow)
* [Usage with React](#usage-with-react)
  * [presentational Components](#presentational-components)
  * [Container Components](#container-components)
  * [Putting All Together](#putting-all-together)  
  * [Passing the Store](#passing-the-store)
* [React Router](#react-router)
* [References](#references)


## Overview

The following tutorial is a compendium of the official Redux documentation. It explains the core concepts and features of the library and demonstrate how to build a Redux application following some of the standards of the company by doing parts of the Redux TODO App example, which it can be found [here](http://redux.js.org/docs/basics/ExampleTodoList.html).

## What is Redux
Redux is a predictable state container for JavaScript apps. It helps to write applications that behave consistently, run in different environments (client, server, and native) and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger. Redux can be used together with React or with any other view library.

## Installation

#### System Requirements

As this tutorial is focused in using Redux with React, it's necessary to have a React project running.

#### Recommended Tools

* Redux DevTools (available for Chrome and Mozilla browsers)

## Setup

1. Open a terminal and move to the location of the React project
2. Install Redux library

  `npm install --save redux`

3. Install the corresponding binding for React

  `npm install --save react-redux`

4. Install a middleware. This is the easiest way to write `async action creators`

  `npm install --save redux-thunk`

## Core Concepts

Redux itself is very simple, it can be described in three fundamental principles:

* Single Source of Truth:

The state of the whole application is stored in an object tree within a single **store**. This makes it easy to create universal apps, as the state from the server can be serialized and hydrated into the client with no extra coding effort. A single state tree also makes it easier to debug or inspect an application.

* State is read-only:

The only way to change the state is to emit an **action**, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state. Instead, they express an intent to transform the state. Because all changes are centralized and happen one by one in a strict order, there are no subtle race conditions to watch out for.

* Changes are made with pure functions:

To specify how the state tree is transformed by actions, pure **reducers** are written. Reducers are just pure functions that take the previous state and an action and return the next state. Remember to return new state objects, instead of mutating the previous state.

#### Actions

Actions are payloads of information that send data from the application to the store. They are the only source of information for the store. Actions are plain JavaScript objects. Actions must have a `type` property that indicates the type of action being performed. Types typically are defined as string constants.

#### Creating Actions

1. Create a new folder called `actions` within the `src` folder
2. Create a new file called `action-types.js` within the `actions` folder
3. Create some new constants to use in the `actions`. For this tutorial "flux-constants" is that it's going to be used to create constants

  `npm install --save flux-constants`

4. Define some constants in the `action-types.js` file

  ```javascript
  import constants from 'flux-constants'

  export default constants([
    'ADD_TODO'
  ])
  ```

#### Action Creators

* They are functions that create actions
* `actions` and `action creators` are not the same
* It's a good practice having a folder within the `actions` folder for each part of the application, e.g. login, account management, user profile management.

#### Defining Action Creators

1. Create a new folder within the `actions` folder. For this example the name of the folder could be `todos`
3. Create a new file called `index.js` within the `todos` folder
4. Define some `action creators`

  ```javascript
  import constants from '../action-types'

  export function addTodo (text) {
    return {
      type: constants.ADD_TODO,
      text
    }
  }
  ```

In the previous example the `action creator` is the whole function. This function receives the payload as a parameter, in this case it's the text of a new todo object. The `action creator` return the `action`, so in this case the `action` is `{type: constants.ADD_TODO, text}`

#### Reducers

**Actions** describe the fact that something happened but don't specify how the application's state changes in response. This is the job of reducers. The reducer is a pure function that takes the previous state and an action and returns the next state. It's very important that the reducer stays pure. Some things that should never be done in a reducer are:

* Mutate its arguments
* Perform side effects like API calls and routing transitions
* Call non-pure functions like `Date.now()` or `Math.random()`

#### Creating Reducers

1. Create a new folder called `reducers` within the `src` folder
2. Create a new folder within the `reducers` folder called `todos`. It's a good practice having a different folder for each part of the application within the `reducers` folder.
3. Create a new file within the `todos` folder called `index.js`
4. Define some `reducer`

```javascript
import constants from '../../actions/action-types'

const initialState = {todos: []}

const todos = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}

export default todos
```

The previous example has the following key things:

* An initial state: It's the initial state of this part of the application, in this case no `todos` are created when the first time the app is running
* There is a `switch` statement in the `todos` function. It's going to evaluate whether the type of the action is the same in some `case` of the `switch`. This example has only one `case` but it could have any other that had relation with this portion of the app's state, e.g. "remove todo", "toggle todo"
* If no type match with some `case` evaluation the default state has to be returned
* The `state` is not mutated, `Object.assign()` is used to create a copy of the whole `state` object. The new `todo` is equal to the old `todos` concatenated with a single new item at the end. The fresh `todo` was constructed using the data from the `action`.  Note that the ES6 spread operator also can be used: `{...state}`

Slicing the `reducers` of the app in many functions or even files makes it possible that the `state` parameter be different for every `reducer`, it knows how to update just the part of the state it manages. This is called **Reducer Composition** and it's the fundamental pattern of building Redux apps.

Now, it's time to combine all the `reducers`. This example has only one but if it had more this is the way to put them all together:

1. Create a new file within the reducers folder called `index.js`
2. Put this code in that file:

```javascript
import {combineReducers} from 'redux'
import todos from './todos'

const rootReducers = combineReducers({
  todos
})

export default rootReducers
```

In the previous example the `combineReducers` function provided by Redux is used. It generates a function that calls all the `reducers` with the slices of state selected according to their keys and combining their results into a single object again.

#### Store

The **Store** is the object that brings the **actions** and the **reducers** together. The store has the following responsibilities:

* Holds application state
* Allows access to state via `getState()`
* Allows state to be updated via `dispatch(action)`
* Registers listeners via `subscribe(listener)`
* Handles unregistering of listeners via the function returned by `subscribe(listener)`
* There is only one single **store** in Redux applications.

#### Creating the Store

1. Create a new folder called `store` within the `src` folder
2. create a new file called `configureStore.js` within the `store` folder
3. Put the following code in that file:

```javascript
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducers from '../reducers'
import thunk from 'redux-thunk'

export default function configureStore (initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(rootReducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk)))
}
```
The previous example has the following:|

* `createStore`: Creates a Redux **store** that holds the complete state tree of the app. This function receives the following arguments:
  * `reducer`: A reducing function that returns the next state tree, given the current state tree and an action to handle
  * [`prerloadState`]: The initial state. It may be optionally specified to hydrate the state from the server in universal apps or to restore a previously serialized user session
  * [`enhancer`]: The store enhancer. Optionally it can be specified to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is `applyMiddleware`

* `applyMiddleware`: Middleware is the suggested way to extend Redux with custom functionality. The most common use case for middleware is to support asynchronous actions without much boilerplate code or a dependency on a library

* `compose`: Composes functions from right to left. This is a functional utility and is included in Redux as a convenience. Receives as arguments the functions to compose. Each function is expected to accept a single parameter. Its return value will be provided as an argument to the function standing to the left and so on. The exception is the right-most argument which can accept multiple parameters, as it will provide the signature for the resulting composed function

* `thunk`: This function allows to write action creators that return a function instead of an action. The `thunk` can be used to delay the dispatch of an action or to dispatch only if a certain condition is met. The inner function receives the store methods `dispatch` and `getState` as parameters

## Data Flow

In this point, we are ready to use Redux with React and create some components, but first let's talk about the data flow. Redux architecture resolves around a strict unidirectional data flow. This means that all data in an application follows the same lifecycle pattern, making the logic of your app more predictable and easier to understand. It also encourages data normalization, so that you don't end up with multiple, independent copies of the same data that are unaware of one another.

The data lifecycle in any Redux app follows these 4 steps:

1. You dispatch an action.
2. The Redux store calls the reducer function you gave it.
3. The root reducer may combine the output of multiple reducers into a single state tree.
4. The Redux store saves the complete state tree returned by the root reducer.

## Usage with React

React bindings for Redux embrace the idea of separating presentational and container components.

#### Presentational Components

* They describe the look but don't know where the data comes from or how to change it
* They only render what's given to them
* If the application migrates from Redux to something else, it will be able to keep all these componants exactly the same
* They have no dependency on Redux

#### Container Components

* Technically, a it's just a React component that uses `store.subscribe()` to read a part of the Redux state tree
* They could be written by hand but it's suggested instead generate them with the react Redux library's `connect()` function

#### `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

#### `[mapStateToProps(state, [ownProps])]`

* If this argument is specified, the new component will subscribe to Redux store updates.
* Any time the store is updated, this function will be called
* The results of this function must be a plain object, which will be merged into the component´s props
* It can be passed `null` or `undefined` if no subscription wanted
* It takes two arguments:
  * The store state as the first parameter
  * The props passed to the connected component as the second parameter

#### `[mapDispatchToProps(dispatch, [ownProps])]`

* If an object is passed, each function inside it is assumed to be a Redux action creator
* If a function is passed, it will be given `dispatch` as the first parameter
* If it's declared as taking two parameters, it will be called with `dispatch` as the first parameter and the props passed to the connected component as the second parameter

#### `bindActionCreators(actionCreators, dispatch)`

Turns an object whose value are `action creators`, into an object with the same keys but with every action creator wrapped into a `dispatch` call so they may be invoked directly

#### Putting All Together

```javascript
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as todoActions from '../../actions/todos'

function mapStateToProps (state) {
  return {
    ...state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

class MyConnectExample extends Component { ... }

export default connect(mapStateToProps, mapDispatchToProps)(MyConnectExample)
```

In the previous example the following key things are being done:

* Importing all the action creators for `todos` with the operator `*`.
* Defining the `mapDispatchToProps` function in which all the action creators imported as `todoActions` will be available in this component in a new `prop` called `actions`, so later it can be possible dispatch an action by doing: `this.props.actions.addTodo("Some Text")`

#### Passing the Store

All container components need access to the Redux store so they can subscribe to it. One option would be to pass it as a prop to every container component. However it gets tedious, so the recommended option is to use a special React Redux component called `<provider` to make the store available to all container components.

In the `index.js` file of the application has to be this code.

```javascript
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import router from './router'
import configureStore from './store/configureStore'
import { init } from './actions/init'

const store = configureStore()

store.dispatch(init())

render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('root')
)
```

Key Things in the previous example:

* Here is an ideal place to dispatch an action that loads some initial configuration of the app. In this case to dispatch an action here it's necessary to do: `store.dispatch(someAction())`
* The `store` is pass to the `Provider` component as a prop: `<Provider store={store}>`
* The child of the `Provider` component is `{router}`, which is something exported from a file called `router`. Routing is a React topic but it was not covered in the React's tutorial to introduce it with the `Provider component` in the way the example shows

## React Router

A new file called `router.js` has to be created within the `src` folder with this code:

```javascript
import React from 'react'
import { Switch, Route, HashRouter as Router } from 'react-router-dom'

import Home from './app/home'
import MyConnectExample from './app/my-connect-example'
import someComponent from './app/somewhere'
import NotFound from './app/not-found'

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/example" component={MyConnectedExample} />
      <Route exact path="/somePath/:someParameter" component={someComponent} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
```

The key features of te previous example are:

* `HashRouter`: A `<Router>` that uses the hash portion of the URL (i.e. window.location.hash) to keep the UI in sync with the URL
* `Switch`: Renders the first child `<Route>` that matches the location
* `Route`: The `Route` component is perhaps the most important component in React Router to understand and learn to use well. Its most basic responsibility is to render some UI when a location matches the route's path
  * `exact`: When true, will only match if the path matches the `location.pathname` exactly:
  `<Route exact path="/one" component={About}/>`

  | path | location.pathname | exact | matches? |
  | ---- | :---------------: | :---: | :------: |
  | /one | /one/two          | true  | no       |
  | /one | /one/two          | false | yes      |

  * `path`: Any valid URL path that `path-to-regexp` understands
  * Routes without a `path` always match, so it's useful to have a default component in case any route matches with the URL provided

## References

* [Official Redux Documentation](http://redux.js.org/docs/introduction/)
* [createStore Definition](http://redux.js.org/docs/api/createStore.html)
* [applyMiddleware Definition](http://redux.js.org/docs/api/applyMiddleware.html)
* [compose Definition](http://redux.js.org/docs/api/compose.html)
* [thunk Definition](https://github.com/gaearon/redux-thunk)
* [connect Definition](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
* [bindActionCreators Definition](http://redux.js.org/docs/api/bindActionCreators.html)
[HashRouter Definition](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md)
* [Switch Definition](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Switch.md)
* [Route Definition](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md)
