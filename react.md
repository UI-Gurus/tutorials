# An Introduction to React for beginners

## Table of Contents

* [Overview](#overview)
* [What is React](#what-is-react)
* [The Virtual DOM](#the-virtual-dom)
* [Installation and Setup](#installation-and-setup)
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

In this tutorial the basis to understand the vast world of React are going to be explored. From installation and setup to review the most interesting things that the library gives. This tutorial is a compendium of the official Facebook documentation, as well as the compilation of other articles that are useful to understand the functioning of React.

## What is React

React is a JavaScript library for building UIs (User Interfaces). It is trying to solve the problem of the DOM in a refreshingly novel way: by completely mocking it and only touching the real thing it needs to. React Components provide a render method, which returns a virtual DOM structure which is, upon state changes, reconciled against the real DOM, and only the minimal set of DOM manipulations will occur in order to actualize the changes realized.

## The Virtual DOM

DOM manipulation is the heart of the modern, interactive web. Unfortunately, it is also a lot slower than most JavaScript operations. This slowness is made worse by the fact that most JavaScript frameworks update the DOM much more than they have to.

In React, for every DOM object, there is a corresponding virtual DOM object. A virtual DOM object is a representation of a DOM object, like a lightweight copy. A virtual DOM object has the same properties as a real DOM object, but it lacks the real thing's power to directly change what's on the screen.

When DOM in React is updated, here is what happen:

1. The entire virtual DOM gets updated
2. The virtual DOM gets compared to what it looked like before it was updated. React figures out which objects have changed
3. The changed objects, and the changed objects only, get updated on the real DOM.
4. Changes on the real DOM cause the screen to change

## Installation and Setup

To start coding on React, all that is needed is to download and install [Node](https://nodejs.org/en/download/). Also, it's necessary an IDE that helps with the syntax highlighting and make the coding process more comfortable. This IDE is of your choice, it could be [Atom](https://atom.io/), [SublimeText 3](https://www.sublimetext.com/3), [Visual Code](https://code.visualstudio.com/) or any other. Generally, in all these IDEs it's necessary to install the respective packages for syntax highlighting, error visualization and other special features. This is not a requirement, but it's also a good idea to have a nice terminal with highlighting and other great stuff. A good option is [Cmder](http://cmder.net/) but it could be any.

It is suggested to use another great tool for React development: **React Developer Tools**. It is an extension available for Google Chrome and Mozilla browsers. With this tool it can be possibly to inspect all the React's code on the Developers Console of the browser. It's very useful and strongly recommended to use.

There are many ways in which a React project can be started, for this tutorial the option chosen was create it through the `create-react-app` npm module. To create the project, it's necessary opening a terminal, move into the location where the project will reside and enter: `npm install -g create-react-app`, after a few seconds this module will be installed, then enter: `create-react-app [my-first-app]`. After a few minutes a new React project named `my-first-app` is ready to use. When ready, move into the new folder created and then enter: `npm start`. That's it, a new React application is now running on the browser.

The `create-react-app` command creates a folder with the name specified and within this folder there are some things that are going to be discussed.

The `index.js` file is the entry point of the application. The following code is in this file:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```
At the top of the file there are some `import` statements. With those `import` statements some stuff from other files is imported, like `React` from `react` and `ReactDOM` from `react-dom`, both of them are React modules. Also, a component from `./App` is imported, components are going to be seen later; the corresponding CSS file and other stuff as the `registerServiceWorker` are imported too. Service Workers are out of scope of this tutorial.

Relative paths are used when something made by us is imported. For example, the `App` component file is in the same folder that the `index.js` file, so it's only necessary to write `./App` as the path from which the file is going to be imported. If the file is in another folder it has to be managed as: one dot means same level, two dots means one level up, and so on.

At the end of the file is this line:

```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```

In React's world everything is a component. Unfortunately not everything around React's world is built using React. At the root of the html tree it's still necessary to write some plumbing code to connect the outer world into React.

Here is where the `ReactDOM.render` comes into action. `ReactDOM.render(reactElement, domContainerNode)` takes two arguments: the react element to render and the DOM node where that element is going to take place.

What is `<App />`?, Well it's a component and it will be rendered in a `<div />` DOM element, which can be found in the `index.html` file on the `public` folder. In this case `<App />` is called as the root component, but a simple HTML tag can be placed:

```javascript
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
```

Now it renders a header saying "Hello World!" on the page.

## Introducing JSX

```javascript
const element = <h1>Hello, world!</h1>;
```

This tag syntax is called JSX and is neither a string nor HTML. It is an extension to JavaScript and it can be used with React to describe what the UI should look like. JSX produces React elements.

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

In the previous piece of code a function to format a name is defined, the name is passed as a parameter, then a new object called `user` is also defined, this object later will be passed as the parameter of the `formatName` function. Then a variable is created where the JSX is split over multiple lines for readability. While it's not required, when doing this, it's recommended wrapping it in parenthesis to avoid the pitfalls of automatic semicolon insertion. Finally this variable is passed as a parameter of the `ReactDom.render` function. In curly braces any JavaScript expression can be executed; in this case the `formatName` function is called with the user object. That's it, this is JSX and it will be like this ever, no matter how complex be the JavaScript expression or the amount of HTML code.

If the above code is copied in the `index.js` file, "Hello, Harper Perez!"" is now displayed on the page.

#### Automatic Semicolon Insertion

In JavaScript, automatic semicolon insertion (ASI) allows one to omit a semicolon at the end of a line. Knowing how JavaScript handles the semicolon omission is important knowledge, because it helps to understand code without semicolons and because it has effects in code with semicolons. The parser treats every new token as part of the current statement, unless there is a semicolon that terminates it. Here are some examples.

```javascript
a = b + c
(d + e).print()
```

In the above example the ASI is not trigger because the opening parenthesis could follow `c` in a function call. It is interpreted as: `a = b + c(d + e).print();`

In the other hand, ASI may be applied in the following case: If a new line is encountered and followed by a token that cannot be added to the current statement, a semicolon is inserted:

```javascript
if (a < 0) a = 0
console.log(a)
```

The result would be:

```javascript
if (a < 0) a = 0;
console.log(a);
```

The use of semicolons can be in a lot of cases unnecessary, but in other cases they help to have a more readable code and to avoid some parsing errors.

#### Standard insight!

If the semicolon is unnecessary **it should not be used**!

#### Specifying Attributes with JSX

```javascript
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
```

In the previous code snippet the first line shows how to specify an string literal attribute of an HTML element in JSX syntax. Quotes is the only thing necessary to specify an attribute of this type. The second line shows how to specify an attribute as a JavaScript expression, with just the use of curly braces is enough to embed the expression.

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

It's the practice of writing compound words or phrases such that each word or abbreviation in the middle of the phrase begins with a capital letter, with no intervening spaces or punctuation. The first letter of a compound word in camel case may or not be capitalized.

In JSX some HTML attributes use camel case, for example `class` becomes `className` and `tabindex` becomes `tabIndex`.

#### Standard insight!

Generally, the standard for variables and function declarations is to use camel case with the first letter not capitalized.

Among the code of the `App.js` file is the following piece:

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
There is JSX syntax here. In the `<img />` tag, the attribute `src` has a JavaScript expression, in this case it's just the name of a variable, but it could be any JavaScript code.

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

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Conceptually, components are like JavaScript functions. They accept arbitrary inputs, called props, and return React elements describing what should appear on the screen. The concepts of "component" and "element" are different. Elements are what components are made of.

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

The above code snippet is a React component. It's made with ES6 classes. All components made under this approach must extends from `React.Component` and always must have the `render` method, which is an special method from the React's lifecycle. This syntax should be used when is necessary to deal with manage the state (stateful components). So, in this kind of components there may be a constructor, the state, and more methods of the lifecycle of React, as custom methods as well.

Most of the time components are constructed on independent files, so they can be reused easily in several parts of the application. For instance, `App` component is used in the `index.js` file by just importing it. To import a component in one place, first it must be exported. The last line of code on this file is:

`export default App;`

With this line the component is exported and can be used on any place of the application.

#### Default or not default

There is an interesting thing when a component is exported from an specific file. It can be used `export default MyComponent` or there is another way of do that without a default clause.

Exporting without `default` means it's a "named export". There may be multiple named exports in a single file:

```javascript
export class MyComponent {...}
export class MySecondComponent {...}
```

First, the `export` clause must be written before the `class` clause. Many components may be exported this way from a single file, **but** then to import these components it's necessary to use their exact names. For example, if the `default` clause is removed from the export statement in the `App.js` file, in the `indes.js` file, where the component is imported, this line: `import App from './App';` has to be changed with this other line: `import {App} from './App';`.

Alternatively, if the export is made as `default`, the importing can be freely named. If the component's name is `App` it can be imported with any name. For example, as the component in the `App.js` file has a default export, it can be named with a different name on the `index.js` file:
`import TheNameYouWant from './App';`. It's important that if the component's name is changed when imported, it should be renamed with a significant name.

There can only be one `default` export per file. In React it's a convention to export one component from a file, and to export it as the default export. The no default method may be used when other kind of stuff like constants or functions are exported.

#### Stateless Functional Components

```javascript
const HelloWorld = (props) => {
  return (
    <h1>Hello, {props.name}</h1>;
  )
}
```

The function above is a valid React component too, because it accepts a single "props" object argument with data and returns a React element. This components are called "functional" because they are literally JavaScript functions.

#### Standard insight!

For any functional component arrow functions are the best way to define them. Also, in this case the name of the component is in camel case but with the first letter of the first word capitalized, any component, functional or not must follow this standard. Why this way? To differentiate it from HTML tags that are always lowercase.

This type of components are useful for dumb components, or also called presentational components. Presentational components focus on the UI rather than behavior. This kind of components do not support state or lifecycle methods. Instead, state should be managed by higher-level container components or via some architecture pattern like Flux or Redux.

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
It still works fine. This is for demonstration only because `App` is higher-level component so it should be a class component, but both of them class and functional components are useful in different scenarios.

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

Here the `props` object is passed as the function parameter and an attribute within that object called `name` is accessed to place it in a header. In this moment if the file is saved the result on the web page will be "Hello", this is because no one is passing down this prop. Props are passing top-down, meaning that someone have to pass the `name` attribute. In the `index.js` file the following line has to be changed:

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

`PropTypes` exports a range of validators that can be used to make sure the data received is valid. In this example, `PropTypes.string` is used. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, `propTypes` is only checked in development mode. The complete list of validations are in the official documentation [here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html).

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

In the `hello.js` file a new functional component called `Hello` is defined and that component just render some headers that say "Hello" in several languages. It receives via props two attributes: one called `name` and another one called `lastName`. This component is imported in the `App` component and it's placed within the `return` statement, and the respective props are passed down. One prop comes from the `props` object that receives the `App` component and the other one is a variable defined in the `App` component.

So, the props can pass down from one component to other as many levels as needed, and components also could have as many props as needed.

## State

State is similar to props, but it's private and fully controlled by the component. It's the heart of every React component. It determines how that component renders and behaves. As was mentioned before, the components defined as classes have some additional features. Local state is exactly that: a feature available only to classes.

#### Adding local state to a class

To add a state to a class component is needed to add a class constructor first that assigns the initial state:

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

Note how `props` is passed to the base constructor. Class components should always call the base constructor with `props`. The above component has an initial state. When `this.state = {}` is doing, all the things inside the curly brackets are part of the component's state. On this case the local state of the component has only one thing, the `isReady` attribute. Note how it can be accessed in the `render` method: `this.state.isReady`.

#### Using State Correctly

State must not be modified directly: `this.state.isReady = true`, this is a wrong way of do that and will not re-rendered a component. Instead, it's recommended to use `setState()`: `this.setState({isready: true})`. The only place where `this.state` can be assigned is in the constructor.

#### setState()

This method enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. Think of `setState()` as a request rather than an immediately command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.

`setState()` may be called with a new value by passing in an object to the function: `this.setState({isReady: true})`. But, often there is a need to update the component's state using the current state of the component. Directly accessing `this.state` to update the component is not a reliable way. So, it's also possibly pass in a function and reliably get the value of the current state of the component:

```javascript
this.setState((prevState, props) => { return {isReady: !prevState.isReady}})
```

Passing in a function into `setState()` instead of an object will give a reliable value for the component's `state` and `props`. If it's known that `setState()` is going to be used to update the component and it's also known that the current state or the current props of the component are needed to calculate the next state, passing in a function as the first parameter instead of an object is the recommended solution.

## The component lifecycle

Each component has several lifecycle methods that can be overridden to run code at particular times in the process. Methods prefixed with `will` are called right before something happens, and methods prefixed with `did` are called right after something happens.

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

The `render()` method is required. When called, it should examine `this.props` and `this.state` and returns a single React element. It can also return `null` or `false` to indicate that nothing is wanted to render. The `render()` method should be pure, meaning that it does not modify component state, it returns the same result each time it is invoked, and it does not directly interact with the browser. If it's needed to interact with the browser, the work must be performed in `compinentDidMount()` or the other lifecycle methods instead. Keeping `render()` pure makes components easier to think about. This means `setState()` should not be called here, query the Native UI or anything else that can mutate the existing state of the application. The reason why is if this kind of interaction is done in `render()`, then it will kickoff another render pass. Which once again, triggers `render()` which then does the same thing over and over.

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

This method is called before the component is mounted. When implementing the constructor for `React.Component` subclass, `super(props)` should be called before any other statement. Otherwise, `this.props` will be undefined in the constructor, which can lead to bugs. Not all React components need a `constructor`, it's only needed when an initial state is required, as the above example, or when it's necessary to `bind` some functions.

If there is a constructor on the class and it's necessary to set a property or access `this` inside the method, `super()` always has to be called, and if it's necessary to access the props inside the `constructor`, it's also a requirement to call `super(props)`.

#### componentWillMount()

This method is invoked immediately before mounting occurs. It is called before `render()` method, therefore setting state synchronously in this method will not trigger a re-rendering. In this method anything that involves the DOM can be done, because there is no component to play with yet. When this method is triggered nothing has changed since the component's constructor was called, which is where it should be setting up the component's default configuration. In this method any setup that can only be done at runtime can be placed as connecting to external API's, so it will need to get that set up as the app is first mounting. But this kind of configurations should be done at the highest level component of the app, so the most probably is that this method is not used at all.

#### componentDidMount()

`componentDidMount()` is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If it's necessary to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.

#### componentWillReceiveProps()

`componentWillReceiveProps()` is invoked before a mounted component receives new props. If it's a need to update the state in response to prop changes (for example, to reset it), `this.props` and `nextProps` may be compared and perform state transitions using `this.setState()` in this method. Note that React may call this method even if the props have not changed, so make sure to compare the current and next values if only changes want to be handled. This may occur when the parent component causes the component to re-render. Here is an example of how to use this method:

```javascript
componentWillReceiveProps(nextProps) {
  if (nextProps.isUnderstadingReact !== this.props.isUnderstadingReact) {
    this.setState({isReady: !this.state.isReady})
  }
}
```

In the previous example there is a prop called `isUnderstadingReact`. If this prop is passed to the component, it can be verified whether it has changed by doing a simple comparison between `nextProps.isUnderstadingReact` and `this.props.isUnderstadingReact`. If different, an update to the local state may be performed, if they stay the same nothing has to be performed.

#### shouldComponentUpdate

Use this method to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in vast majority of cases you should rely on the default behavior. Typical React dogma says that when a component receives new props, or new state, it should update. `shouldComponentUpdate` should always return a boolean, an answer to the question, "should I re-render?"

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.something !== this.props.something
}
```
The above snippet code demonstrate the functioning of this method: If there was a change on some specific prop then the component should be updated, otherwise no update is required.

#### componentWillUpdate

Functionally it is basically the same as `componentWillReceiveProps`, except it's not allowed to call `this.setState`. If  `shouldComponentUpdate` is used and it's necessary to do something when props change, this method has sense. But it's probably not going to gives a whole lot of additional utility.

#### componentDidUpdate

Here the same stuff did in `componentDidMount` can be done, reset the layout, redraw a canvas, etc.

#### componentWillUnmount

Here any outgoing network requests can be cancelled, or remove all event listeners associated with the component.

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

In the previous code snippet a new method called `handleClick` is defined. In this method the local state of the component is changed. In `render` method a `button` tag is added and as the `onClick` attribute of that tag the `handleClick` method is passed. Notice two important things here. First the attribute is `onClick`, camel case definition and not common html `onclick` definition. Second, when the function is passed as the attribute of the `button` tag it's necessary to do: `this.handleClick`. This is necessary to reference the name of the function, and it's only the function name, no parenthesis needed. Finally, the `constructor` method has this: `this.handleClick = this.handleClick.bind(this)`, `this` `this` and more `this`, what does mean that. In JavaScript, class methods are not bound by default. If you forget to bind `this.handleClick` and pass it to `onClick`, `this` will be `undefined` when the function is actually called. If a method without `()` after it is referred, it should be bound, it's just JavaScript functions behavior.

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

In the above example a loop is performed through the `numbers` array using the `map` function. It returns an `<li>` element for each item. Finally, the resulting array of elements is assigned to `listItems`. Then the entire `listItems` array is included inside a `<ul>` element, and render it to the DOM.

#### Keys

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identify.

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

Here a new component is defined. This component will receive a `props` object with the `name` and the `descrption` of one supply. Then that information is returned in headers within a list element.

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

It is just an object that contains some other objects inside, each one represents a supply.

The `App.js` file is modified this way:

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

First, the new component and the object with the supplies information are imported. In the `render` method a `<ul>` element is created and within this element a list of supplies is created iteratively. `Object.keys()` receives an object and it will return each one of the keys of that object, in this case it will return `supply1`, `supply2` and `supply3`. So, a `map` function can be performed over those values and therefore the `map` function receives the `key` as a parameter and creates a `<ListSupply>` element for each `key` on the `MyStockList` object. The `<ListSupply>` element receives one of the values of that object as a prop, then that component process the props and displays the content.

## Controlled Components

Controlled components are special components to manage forms. They have functions to govern the data going into them on every `onChange` event, rather than grabbing the data only once. This governed data is then saved to state (in this case, the parent/container component's state). Data displayed by a controlled component is received through props passed down from its parent/container component.

This is a one way loop. Data goes from child component input to parent component state and back down to the child component via props. This is what in React application architecture it's called undirectional data flow.

In the following example a new file named `form.js` with this code is created:

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

What are the interesting things on this component? Well, this component has a method to handle changes and a method to submit the form. The `handleChange` method looks for the `name` and the `value` of the form element that has changed and update the local state with that information as a pair of `key` and `value`. Note that the handy ES6 computed property name syntax is used to update the state key corresponding to the given input name:

```javascript
this.setState({[name]: value})
```

Therefore it's important that every form element in this case has a name, so they can later be accessed by this name and get their corresponding value.

Note that in this case there is no initial state, there is no any `name` and `value` pair when this component is created, this is the same as it had an initial state like `this.state =  {name: null}` or something like that, not necessary at all.

Now on `App.js` file the form component can be imported and placed in the `render` method. If the first time when the submit button is clicked one of the `inputs` is empty something like "Charlie undefined", or "undefined Brown" will be displayed on the page depending on which `input` was empty. This is because the first time no key with `name` or `lastName` resides in the `state` of the component and in the `handleSubmit` method those values are accessed. Well maybe always have an initial state in the component is useful.

## Lifting State Up

To share a state between two components, the most common operation is to move it up to their closest common ancestor. This is called "lifting state up", in other words removing the local state from the descendant component and move it into its ancestor instead. The descendant component become controlled. Lifting state involves writing more boilerplate code that two-way approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state lives in some component and that component alone can change it, the surface area for bugs is greatly reduced.

How it works? Well [here](https://facebook.github.io/react/docs/lifting-state-up.html) are a complete and an extensive tutorial on how accomplish it, but basically if there are two components each one with its own state and we want to update one of them in response to changes in the other, it's necessary to move up both local states. This means create an ancestor component that wraps the children components with a unique source of information and pass down this information via props.

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
