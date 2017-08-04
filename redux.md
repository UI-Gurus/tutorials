# Introduction to Redux for beginners

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger. You can use Redux together with React, or with any other view library.

##Getting Started with Redux

First, you would like to install **Redux DevTools** which is an extension for Chrome and Mozilla that provides power-ups for tour Redux development workflow. In this tutorial we are using **Create React App** to work, so if you still want to work with the same project than the used in the React tutorial go ahead, or you can create a new one. Move to the folder of your project and let's start installing some dependencies.

`npm install --save redux`

This will install in your `package.json` file the Redux dependency. As we are using Redux with React we also need to install the corresponding binding:

`npm install --save react-redux`

Also, we are going to install a middleware dependency called "redux-thunk", which is the easiest way to write async action creators. We'll see what action creator are during the tutorial.

`npm install --save redux-thunk`

We have all we need to start with Redux, so far. So let's start to view its core concepts.

## Core Concepts

Redux itself is very simple, it can be described in three fundamental principles:

* Single Source of Truth:

The state of your whole application is stored in an object tree within a single **store**. This makes it easy to create universal apps, as the state from your server can be serialized and hydrated into the client with no extra coding effort. A single state tree also makes it easier to debug or inspect an application; it also enables you to persist your app's state in development, for a faster development cycle.

* State is read-only:

The only way to change the state is to emit an **action**, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state. Instead, they express an intent to transform an intent to transform the state. Because all changes are centralized and happen one by one in a strict order, there are no subtle race conditions to watch out for.

* Changes are made with pure functions:

To specify how the state tree is transformed by actions, you write pure **reducers**. Reducers are just pure functions that take the previous state and an action, and return the next state. Remember to return new state objects, instead of mutating the previous state.

#### Actions

Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. Actions are plain JavaScript objects. Actions must have a `type` property that indicates the type of action being performed. Types typically be defined as string constants.

Let's start to write some code. First, create a new folder within the `src` folder named `actions`. Within this folder create a new file names `action-types.js`, In this file we are going to define all the necessary constants to use with our `actions`. There are several ways to define constants in JavaScript, but we are going to use an special way through something called "flux-constants". So, we need to install that dependency first:

`npm install --save flux-constants`

Now on this file copy the following code:

```javascript
import constants from 'flux-constants'

export default constants([
  'ADD_TODO',
  'TOGGLE_TODO',
  'SET_VISIBILITY_FILTER'
])
```

Note that the name of the constants are uppercase and if they consist on more than one word the standard is separate the words with snake case.

#### Action Creators

Action creators are exactly that, functions that create actions. It's easy to conflate the terms **action** and **action creator**, so do your best to use the proper term. In large applications we are going to have many action creators, therefore it is common that within the `actions` folder we could create more folders, one for each feature of our application. Our example is too short and we don't have to do that, but because it is a good practice we are going to do it that way.

We are going to do the todo example of the official Redux documentation, therefore we'll create a new folder named `todo` within our `actions` folder. Within this new folder create a new file called `index.js` and copy the following code:

```javascript
import constants from '../action-types'

export function addTodo (text) {
  return {
    type: constants.ADD_TODO,
    text
  }
}

export function toggleTodo (index) {
  return {
    type: constants.TOGGLE_TODO,
    index
  }
}

export function setVisibilityFilter (filter) {
  return {
    type: constants.SET_VISIBILITY_FILTER,
    filter
  }
}
```

Here we are creating three action creator. Remember, action creators are the functions that return the `actions`, so in `addTodo` function for example the `action` consist in the type and the payload that comes as a parameter, called in this case `text`. This stuff is returned in a object for the action creator and then a `reducer` will receive that information.

#### Reducers

**Actions** describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of reducers. The reducer is a pure function that takes the previous state and an action, and returns the next state. It's very important that the reducer stays pure. Some things you should never do inside a reducer:

* Mutate its arguments
* Perform side effects like API calls and routing transitions
* Call non-pure functions like `Date.now()` or `Math.random()`

#### Store

The **Store** is the object that brings the **actions** and the **reducers** together. The store has the following responsibilities:

* Holds application state
* Allows access to state via `getState()`
* Allows state to be updated via `dispatch(action)`
* Registers listeners via `subscribe(listener)`
* Handles unregistering of listeners via the function returned by `subscribe(listener)`

It is important to note that you'll only have a single **store** in Redux applications. Ok, let's create our store application. First, we have to create a new folder called `store` and a file within this folder named `configureStore.js`. Then copy the next code on that file:

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

Ok, that's a small piece of code but has much to explain. First of all, what are we importing here?

From `redux` we are importing the following stuff:

* `createStore` function: Creates a Redux **store** that holds the complete state tree of your app. This function receives the following arguments:
  * `reducer`: A reducing function that returns the next state tree, given the current state tree and an action to handle.
  * [`prerloadState`]: The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session.
  * [`enhancer`]: The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is `applyMiddleware`

* `applyMiddleware` function: Middleware is the suggested way to extend Redux with custom functionality. The most common use case for middleware is to support asynchronous actions without much boilerplate code or a dependency on a library.

* `compose` function: Composes functions from right to left. This is a functional utility, and is included in Redux as a convenience. Receives as arguments the functions to compose. Each function is expected to accept a single parameter. Its return value will be provided as an argument to the function standing to the left, and so on. The exception is the right-most argument which ca accept multiple parameters, as it will provide the signature for the resulting composed function.

Also, we are importing our `rootReducers` from the `reducers` folder. Finally is `thunk` which we import from `redux-thunk`. This function allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action or to dispatch only is a certain condition is met. the inner function receives the store methods `dispatch` and `getState` as parameters.

## Data Flow

In this point, we are ready to use Redux with React and create some components, but first let's talk about the data flow. Redux architecture resolves around a strict unidirectional data flow. This means that all data in an application follows the same lifecycle pattern, making the logic of your app more predictable and easier to understand. It also encourages data normalization, so that you don't end up with multiple, independent copies of the same data that are unaware of one another.

The data lifecycle in any Redux app follows these 4 steps:

1. You dispatch an action.
2. The Redux store calls the reducer function you gave it.
3. The root reducer may combine the output of multiple reducers into a single state tree.
4. The Redux store saves the complete state tree returned by the root reducer.

## Usage with React
