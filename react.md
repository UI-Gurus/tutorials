# An Introduction to React for beginners

## Table of Contents

* [Overview](#overview)
* [What is React](#what-is-react)
* [The Virtual DOM](#the-virtual-dom)
* [Installation](#installation)
  * [System Requirements](#system-requirements)
  * [Recommended IDEs](#recommended-ides)
  * [Other Recommended Tools](#other-recommended-tools)
* [Setup](#setup)
* [Getting Started](#getting-started)
* [Introducing JSX](#introducing-jsx)
  * [Embedding Expressions in JSX](#embedding-expressions-in-jsx)
  * [Automatic Semicolon Insertion (ASI)](#automatic-semicolon-insertion)
  * [Specifying Attributes with JSX](#specifying-attributes-with-jsx)
  * [Specifying Children with JSX](#specifying-children-with-jsx)
* [Components and Props](#components-and-props)
  * [Class Components](#class-components)
  * [Default or not Default](#default-or-not-default)
  * [Stateless Functional Components](#stateless-functional-components)
  * [Advantages of a Stateless Component](#advantages-of-a-stateless-component)
  * [Props](#props)
  * [Props Validation](#props-validation)
  * [Composing Components](#composing-components)
* [State](#state)
  * [Adding Local State to a Class](#adding-local-state-to-a-class)
  * [Using State Correctly](#using-state-correctly)
  * [setState()](#setstate)
* [The Component Lifecycle](#the-component-lifecycle)
  * [Mounting](#mounting)
  * [Updating](#updating)
  * [Unmounting](#unmounting)
  * [render()](#render)
  * [constructor()](#constructor)
  * [componentWillMount()](#componentwillmount)
  * [componentDidMount()](#componentdidmount)
  * [componentWillReceiveProps()](#componentwillreceiveprops)
  * [shouldComponentUpdate()](#shouldcomponentupdate)
  * [componentWillUpdate()](#componentwillupdate)
  * [componentDidUpdate()](#componentdidupdate)
  * [componentWillUnmount()](#componentwillunmount)
* [Handling Events](#handling-events)
* [List and Keys](#list-and-keys)
  * [Keys](#keys)
* [Controlled Components](#controlled-components)
* [Lifting State UP](#lifting-state-up)
* [References](#references)

## Overview

This tutorial is a compendium of the official Facebook documentation, as well as the compilation of other articles that are useful to understand the functioning of React. **Create React App** is used to create a demonstration app, so the examples shown in this guide can be done for a better understanding.

## What is React

React is a JavaScript library for building UIs (User Interfaces). It's trying to solve the problem of the DOM in a refreshingly novel way: by completely mocking it and only touching the real thing it needs to. React Components provide a render method, which returns a virtual DOM structure which is, upon state changes, reconciled against the real DOM and only the minimal set of DOM manipulations will occur in order to actualize the changes realized.

## The Virtual DOM

DOM manipulation is the heart of the modern, interactive web. Unfortunately, it's also a lot slower than most JavaScript operations. This slowness is made worse by the fact that most JavaScript frameworks update the DOM much more than they have to.

In React for every DOM object there is a corresponding virtual DOM object. A virtual DOM object is a representation of a DOM object, like a lightweight copy. A virtual DOM object has the same properties as a real DOM object but it lacks the real thing's power to directly change what's on the screen.

When DOM in React is updated here is what happen:

1. The entire virtual DOM gets updated
2. The virtual DOM gets compared to what it looked like before it was updated. React figures out which objects have changed
3. The changed objects get updated on the real DOM.
4. Changes on the real DOM cause the screen to change

## Installation

#### System Requirements

* [NodeJS](https://nodejs.org/en/download/).

#### Recommended IDEs

* [Atom](https://atom.io/)
* [SublimeText 3](https://www.sublimetext.com/3)
* [Visual Code](https://code.visualstudio.com/)

#### Other Recommended Tools

* [Cmder](http://cmder.net/)
* React Developer Tools (available for Chrome and Mozilla)

## Setup

1. Open a terminal and move to the location where the project will reside
2. Install **Create React APP**

  `npm install -g create-react-app`

3. Create a new React project

  `create-react-app [my-first-app]`

4. Move into the new folder created
5. Start the application

  `npm start`

## Getting Started

The `index.js` file is the entry point of the application. It has the following code:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

With `import` statements is possibly use features and components from other files. In this case `React` and `ReactDOM` are imported things from the React's library while `./App` is the root component of the application.

Relative paths are used when something made by us is imported. For example, the `App` component file is in the same folder that the `index.js` file, so it's only necessary to write `./App` as the path from which the file is going to be imported. If the file is in another folder it has to be managed as: one dot means same level, two dots means one level up and so on.

At the end of the file is this line:

```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```

In React's world everything is a component. Unfortunately not everything around React's world is built using React. At the root of the html tree it's still necessary to write some plumbing code to connect the outer world into React.

Here is where the `ReactDOM.render` comes into action. `ReactDOM.render(reactElement, domContainerNode)` takes two arguments: the react element to render and the DOM node where that element is going to take place.

What is `<App />`? It's a component and it will be rendered in a `<div />` DOM element, which can be found in the `index.html` file on the `public` folder. In this case `<App />` is called as the root component but a simple HTML tag can be placed:

```javascript
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
```

Now it renders a header saying "Hello World!" on the page.

## Introducing JSX

```javascript
const element = <h1>Hello, world!</h1>;
```

This tag syntax is called JSX and is neither a string nor HTML. It's an extension to JavaScript and it can be used with React to describe what the UI should look like. JSX produces React elements.

#### Embedding expressions in JSX

```javascript
const formatName = (user) => {
  return user.firstName + ' ' + user.lastName;
};

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

The previous example has the following:

* `formatName`: function. Note the use of arrow functions here
* `user`: object. It's used as the parameter of the `formatName` function
* `element`: JSX element. The JSX code is split over multiple lines for readability. While it's not required, when doing this, it's recommended wrapping it in parenthesis to avoid the pitfalls of automatic semicolon insertion
* `ReactDom.render`: It renders the `element` variable content on the page

#### Automatic Semicolon Insertion

Automatic semicolon insertion (ASI) allows one to omit a semicolon at the end of a line. Knowing how JavaScript handles the semicolon omission is important knowledge, because it helps to understand code without semicolons and because it has effects in code with semicolons. If the semicolon is unnecessary **it should not be used**!

#### Specifying Attributes with JSX

```javascript
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
```

In the previous example the first line shows how to specify an string literal attribute of an HTML element in JSX syntax. Quotes is the only thing necessary to specify an attribute of this type. The second line shows how to specify an attribute as a JavaScript expression, with just the use of curly braces is enough to embed the expression.

#### Specifying children with JSX

```javascript
const element = <img src={user.avatarUrl} />;
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

An HTML tag can be empty or has children. If it's empty it can be closed by simply putting `/>`.

#### Camel case

In JSX some HTML attributes use camel case, for example `class` becomes `className` and `tabindex` becomes `tabIndex`. Generally, the standard for variables and function declarations is to use camel case with the first letter not capitalized.

In `App.js` file is the following code:

```html
(
<div className="App">
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>
</div>
)
```
There is JSX syntax here. In the `<img />` tag the attribute `src` has a JavaScript expression, in this case it's just the name of a variable but it could be any JavaScript code.

For instance, it can be possibly place a conditional expression in a header tag:

```html
render() {
  const isReady = false
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{isReady ? "You're ready to start" : "You're not ready to start"}</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}
```

Here depending on the value of the variable `isReady` the page will displayed "You're ready to start" or "You're not ready to start".

## Components and Props

Components let you split the UI into independent, reusable pieces and think about each piece in isolation. Conceptually, components are like JavaScript functions. They accept arbitrary inputs called props and return React elements describing what should appear on the screen. The concepts of "component" and "element" are different. Elements are what components are made of.

There are two main different types of components: Functional and Class Components.

#### Class Components

`App.js` file contains a class component. Here is the code:

```javascript
class App extends Component {
  render() {
    const isReady = true
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{isReady ? "You're ready to start" : "You're not ready to start"}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
```

The previous component was done with ES6 classes. All components done under this approach must extends from `React.Component` and always must have the `render` method, which is an special method from the React's lifecycle. This syntax should be used when it's necessary to deal with manage the state (stateful components). In this kind of components there may be a constructor, a local state and more methods of the lifecycle of React, as custom methods as well.

#### Default or not default

When a component is exported from an specific file it can be used `export default MyComponent` or without a default keyword.

Exporting without `default` means it's a "named export". There may be multiple named exports in a single file:

```javascript
export class MyComponent {...}
export class MySecondComponent {...}
```

Many components can be exported in this way from a single file **but** then when they are imported it's necessary to use their exact names: `import {App} from './App';`.

Alternatively, if the export is done as `default` the importing can be freely named: `import TheNameYouWant from './App';`. It's important that if the component's name is changed when imported it should be renamed with a significant name.

There can only be one `default` export per file. In React it's a convention to export one component from a file, and to export it as the default export. The no default method may be used when other kind of stuff like constants or functions are exported.

#### Stateless Functional Components

```javascript
const HelloWorld = (props) => {
  return (
    <h1>Hello, {props.name}</h1>;
  )
}
```

* They are called "functional" because they are literally JavaScript functions
* The name of the component has to be in camel case with the first letter capitalized, this is to differentiate it from HTML tags that are always lowercase
* They are useful for dumb components or also called presentational components. Presentational components focus on the UI rather than behavior. * This kind of components do not support state or lifecycle methods. Instead, state should be managed by higher-level container components or via some architecture pattern like Flux or Redux.

#### Advantages of a stateless component

* Programmatically Enforce keeping the component pure
* Forces to put state management where it belongs: in higher level container components
* Require less typing
* Easy to understand: it's just a function that takes props and splits HTML
* Easy to test: Since it's a pure function, the assertions are very straightforward: Given an specific value for props, it can be expected to return an specific markup.

The `App` class component can be converted on a functional component:

```javascript
const App = (props) => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hello World!</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}
```
It still works fine. This is for demonstration only because `App` is higher-level component so it should be a class component but both of them, class and functional components, are useful in different scenarios.

#### Props

Elements can also represent user-defined components, so when react sees an element representing a user-defined component, it passes JSX attributes to this component as a single object. This object is called "props". Props are immutable and is a way of passing data from parent to child.

```javascript
const App = (props) => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hello {props.name}</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}
```

Here the `props` object is passed as the function parameter and an attribute within that object called `name` is accessed to place it in a header. In this moment if the file is saved the result on the web page will be "Hello", this is because no one is passing down this prop. In the `index.js` file the following line has to be changed:

```javascript
ReactDOM.render(<App name="Charlie"/>, document.getElementById('root'));
```

Saving this file the page should display "Hello Charlie". `name` is now an attribute of the `<App />` element and these attributes in React are called props.

#### Prop validation

React has some built-in typechecking abilities. To run typechecking on the props for a component, the special `propTypes` property can be assigned:

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

`PropTypes` exports a range of validators that can be used to make sure the data received is valid. In this example, `PropTypes.string` is used. When an invalid value is provided for a prop a warning will be shown in the JavaScript console. For performance reasons, `propTypes` is only checked in development mode. The complete list of validations are in the official documentation [here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html).

#### Composing Components

Components can refer to other components in their output. This lets the same component abstraction for any level of detail.

The following code is created in a new file called `hello.js`

```javascript
import React from 'react';

const Hello = (props) => {
  return (
    <div>
      <h1>Hello, {props.name + ' ' + props.lastName}</h1>;
      <h1>Hola, {props.name + ' ' + props.lastName}</h1>;
      <h1>Ciao, {props.name + ' ' + props.lastName}</h1>;
      <h1>Salut, {props.name + ' ' + props.lastName}</h1>;
    </div>
  )
}

export default Hello;
```

Now the `App.js` file is changed this way:

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './hello'

const App = (props) => {
  const lastName = "Brown"
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <p className="App-intro">
        <Hello name={props.name} lastName={lastName} />
      </p>
    </div>
  );
}

export default App;
```

In this example one prop comes from the `props` object that receives the `App` component and the other one is a variable defined in the `App` component. Props can be passed down from one component to other as many levels as needed and components could have as many props as needed.

## State

State is similar to props but it's private and fully controlled by the component. It's the heart of every React component. It determines how that component renders and behaves. As was mentioned before, the components defined as classes have some additional features. Local state is exactly that: a feature available only to classes.

#### Adding local state to a class

```javascript
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isReady: false
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.isReady ? "You're ready to start" : "You're not ready to start"}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
```

Note how `props` is passed to the base constructor. Class components should always call the base constructor with `props`. The previous component has an initial state. When `this.state = {}` is doing, all the things inside the curly brackets are part of the component's state. On this case the local state of the component has only one thing: the `isReady` attribute. Note how it can be accessed in the `render` method: `this.state.isReady`.

#### Using State Correctly

* State must not be modified directly: `this.state.isReady = true`
* It's recommended to use `setState()`: `this.setState({isready: true})`
* The only place where `this.state` can be assigned is in the constructor

#### setState()

This method enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. Think of `setState()` as a request rather than an immediately command to update the component. For better perceived performance, React may delay it, then it updates several components in a single pass. React does not guarantee that the state changes are applied immediately.

`setState()` may be called with a new value by passing in an object to the function: `this.setState({isReady: true})`. But often there is a need to update the component's state using the current state of the component. Directly accessing `this.state` to update the component is not a reliable way. So, it's also possibly pass in a function and reliably get the value of the current state of the component:

```javascript
this.setState((prevState, props) => { return {isReady: !prevState.isReady}})
```

Passing in a function into `setState()` instead of an object will give a reliable value for the component's `state` and `props`. If it's known that `setState()` is going to be used to update the component and it's also known that the current state or the current props of the component are needed to calculate the next state, passing in a function as the first parameter instead of an object is the recommended solution.

## The component lifecycle

Each component has several lifecycle methods that can be overridden to run code at particular times in the process. Methods prefixed with `will` are called right before something happens and methods prefixed with `did` are called right after something happens.

#### Mounting

These methods are called when an instance of a component is being created and inserted into the DOM:

* `constructor()`
* `componentWllMount()`
* `render()`
* `componentDidMount()`

#### Updating

An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:

* `componentWillReceiveProps()`
* `shouldComponentUpdate()`
* `componentWillUpdate()`
* `render()`
* `componentDidUpdate()`

#### Unmounting

This method is called when a component is being removed from the DOM:

* `componentWillUnmount()`

#### render()

* It's required
* It should examine `this.props` and `this.state`
* Returns a single React element. If nothing is wanted to render can return `null` or `false`
* It should be pure: It must not modify component's state
* `setState()` must not be called here, nor query the Native UI or anything else that can mutate the existing state of the application. If this kind of interaction is done here then it will kickoff another render pass. Which once again triggers `render()` which then does the same thing over and over
* It does not directly interact with the browser. If this is needed the work must be performed in `compinentDidMount()` or other lifecycle method instead

```javascript
render() {
  this.setState({ isready: true }) // Do not do this
  return (
    <div>
      ...
    </div>
  )
}
```

#### constructor()

* Called before the component is mounted
* `super(props)` should be called before any other statement. Otherwise, `this.props` will be undefined in the constructor.
* It's only necessary when an initial state is required or when it's needed to `bind` some functions

#### componentWillMount()

* Invoked immediately before mounting occurs
* Called before `render()` method
* Setting state synchronously in this method will not trigger a re-rendering
* Anything that involves the DOM can be done
* Any setup that can only be done at runtime can be placed as connecting to external API's. This kind of configurations should be done at the highest level component of the app, so probably it's not going to be used

#### componentDidMount()

* Invoked immediately after a component is mounted
* Initialization that requires DOM nodes should go here.
* If it's necessary to load data from a remote endpoint this is a good place to instantiate the network request
* Setting state in this method will trigger a re-rendering.

#### componentWillReceiveProps()

* Invoked before a mounted component receives new props
* If a prop changed `this.props` and `nextProps` may be compared and perform state transitions using `this.setState()`
* React may call this method even if the props have not changed, so it's important to perform an action only if there is some change

```javascript
componentWillReceiveProps(nextProps) {
  if (nextProps.isUnderstadingReact !== this.props.isUnderstadingReact) {
    this.setState({isReady: !this.state.isReady})
  }
}
```

#### shouldComponentUpdate

* Use this method to let React know if a component's output is not affected by the current change in state or props
* The default behavior is to re-render on every state change, and in vast majority of cases you should rely on the default behavior
* Should always return a boolean, an answer to the question, "should I re-render?"

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.something !== this.props.something
}
```

#### componentWillUpdate

* Functionally it's basically the same as `componentWillReceiveProps`
* It's not allowed to call `this.setState`

#### componentDidUpdate

* The same stuff did in `componentDidMount` can be done, reset the layout, redraw a canvas, etc

#### componentWillUnmount

* Any outgoing network requests can be cancelled or remove all event listeners associated with the component.

## Handling Events

```javascript
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isReady: true
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    this.setState(prevState => ({
      isReady: !prevState.isReady
    }));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.isReady ? "You're ready to start" : "You're not ready to start"}</h2>
        </div>
        <p className="App-intro">
          <button onClick={this.handleClick}>Click me!</button>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
```

The previous example has the following:

* A method called `handleClick`. In this method the local state of the component is changed.
* `handleClick` is added as the `onClick` attribute of the `button` tag. `this` is necessary to reference the name of the function
* Binding the function is necessary in the `constructor` method: `this.handleClick = this.handleClick.bind(this)`
* If a method without `()` after it is referred it should be bound, otherwise `this` will be `undefined` when the function is actually called

## List and Keys

Multiple components can be rendered using JavaScript methods such `map` or `forEach`.

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

The previous example does the following:

1. A loop is performed through the `numbers` array using the `map` function
2. It returns an `<li>` element for each item
3. The resulting array of elements is assigned to `listItems`
4. The entire `listItems` array is included inside a `<ul>` element and render it to the DOM

#### Keys

Keys help React identify which items have changed, are added or are removed. Keys should be given to the elements inside the array to give the elements a stable identify.

In the following example a new file named `list.js` with this code is created:

```javascript
import React from 'react';

const ListSupply = (props) => {
  return (
    <li>
      <h1>{props.supply.name}</h1>
      <h3>{props.supply.description}</h3>
    </li>
  )
}

export default ListSupply
```

Another file named `supplies.js` with the following code is created:

```javascript
const MyStockList = {
  supply1: {
    id: 1,
    name: "Supply1",
    description: "This is the first supply"
  },
  supply2: {
    id: 2,
    name: "Supply2",
    description: "This is the second supply"
  },
  supply3: {
    id: 3,
    name: "Supply3",
    description: "This is the third supply"
  }
}

export default MyStockList
```

The `App.js` file is modified on this way:

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListSupply from './list.js'
import MyStockList from './supplies'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          <ul>
            {
              Object.keys(MyStockList).map(key =>
              <ListSupply
                key={key}
                supply={MyStockList[key]}
              />)
            }
          </ul>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

The previous example performs the following:

1. A `<ul>` element is created and within this element a list of supplies is created iteratively
2. `Object.keys()` receives an object and it will return each one of the keys of that object
3. A `map` function can be performed over those values and creates a `<ListSupply>` element for each `key` on the `MyStockList` object
4. The `<ListSupply>` element receives one of the values of that object as a prop then that component process the props and displays the content

## Controlled Components

* Useful for managing forms
* They have functions to govern the data going into them on every `onChange` event, rather than grabbing the data only once
* The governed data is then saved to state (in this case, the parent/container component's state)
* Data displayed by a controlled component is received through props passed down from its parent/container component
* This is a one way loop. Data goes from child component input to parent component state and back down to the child component via props. This is what in React application architecture it's called undirectional data flow.

```javascript
import React, {Component} from 'react'

class MyForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    alert('The full name submitted is ' + this.state.name + ' ' + this.state.lastName);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MyForm;
```

The previous example was done in a new file named `form.js`. It does the following:

* The component has a method to handle changes and a method to submit the form
* The `handleChange` method looks for the `name` and the `value` of the form element that has changed and update the local state with that information as a pair of `key` and `value`
* Note that the handy ES6 computed property name syntax is used to update the state key corresponding to the given input name:

  ```javascript
  this.setState({[name]: value})
  ```

* It's important that every form element in this case has a name, so they can later be accessed by this name and get their corresponding value
* Note that in this case there is no initial state, there is no any `name` and `value` pair when this component is created, this is the same as it had an initial state like `this.state = {name: null}` or something like that
* If the first time when the submit button is clicked one of the `inputs` is empty something like "Charlie undefined" or "undefined Brown" will be displayed on the page depending on which `input` was empty. This is because the first time no key with `name` or `lastName` resides in the `state` of the component and in the `handleSubmit` method those values are accessed, so in some cases have an initial state is useful

## Lifting State Up

To share a state between two components, the most common operation is to move it up to their closest common ancestor. This is called "lifting state up", in other words removing the local state from the descendant component and move it into its ancestor instead. Then the information is passed down via prop. The descendant component become controlled. Lifting state involves writing more boilerplate code that two-way approaches but as a benefit it takes less work to find and isolate bugs. Since any state lives in some component and that component alone can change it the surface area for bugs is greatly reduced.

## References

* [Official React Documentation](https://facebook.github.io/react/)
* [What is React](https://j11y.io/javascript/what-is-react/)
* [Virtual DOM](https://www.codecademy.com/articles/react-virtual-dom)
* [ReactDOM.render()](https://facebook.github.io/react/blog/2015/10/01/react-render-and-top-level-api.html)
* [Automatic Semicolon Insertion](http://2ality.com/2011/05/semicolon-insertion.html)
* [Camel Case Definition](https://en.wikipedia.org/wiki/Camel_case)
* [Stateless Components](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc)
* [Class Constructor](http://hacktivist.in/articles/React-es6-constructor-super)
* [Render method](https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/birth/component_render.html)
* [setState()](https://medium.com/@shopsifter/using-a-function-in-setstate-instead-of-an-object-1f5cfd6e55d1)
* [React.Component](https://facebook.github.io/react/docs/react-component.html)
* [Node Modules](https://stackoverflow.com/questions/34526844/what-is-node-modules-directory-in-angularjs)
* [Lifecycle Methods](https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1)
* [Default Export](https://stackoverflow.com/questions/31852933/why-es6-react-component-works-only-with-export-default)
* [Controlled Components](http://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/)
* [Lifting State Up](https://gerardnico.com/wiki/lang/javascript/react/shared_state)
* [PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
