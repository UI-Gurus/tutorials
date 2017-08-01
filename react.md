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

## Overview

In this tutorial we are going to explore the basis to understand the vast world of React. From installation and setup to review the most interesting things that the library give us. This tutorial is a compendium of the official Facebook documentation, as well as the compilation of other articles that will help us to understand the functioning of React. So, let's begin.

## What is React

React is a JavaScript library for building UIs (User Interfaces). It is trying to solve the problem of the DOM in a refreshingly novel way: by completely mocking it and only touching the real thing it needs to. React Components provide a render method, which returns a virtual DOM structure which is, upon stat changes, reconciled against the real DOM, and only the minimal set of DOM manipulations will occur in order to actualize your changes.

## The Virtual DOM

DOM manipulation is the heart of the modern, interactive web. Unfortunately, it is also a lot slower than most JavaScript operations. This slowness is made worse by the fact that most JavaScript frameworks update the DOM much more than they have to.

In React, for every DOM object, there is a corresponding virtual DOM object. A virtual DOM object is a representation of a DOM object, like a lightweight copy. A virtual DOM object has the same properties as a real DOM object, but it lacks the real thing's power to directly change what's on the screen.

When you try to update the DOM in React, here is what happen:

1. The entire virtual DOM gets updated
2. The virtual DOM gets compared to what it looked like before you updated it. React figures out which objects have changed
3. The changed objects, and the changed objects only, get updated on the real DOM.
4. Changes on the real DOM cause the screen to change

## Installation and Setup

To start coding on React, all you need is to download and install [Node](https://nodejs.org/en/download/). Also, you will need an IDE that help you on syntax highlighting and make the coding process more comfortable. This IDE is of your choice, it could be [Atom](https://atom.io/), [SublimeText 3](https://www.sublimetext.com/3), [Visual Code](https://code.visualstudio.com/) or any other. Whichever you choose, you have to install the respective packages for syntax highlighting, error visualization or any other you want. This ss not a requirement, but you also may want to have a nice terminal if you have not one yet. A good option is [Cmder](http://cmder.net/) but you can use the one you prefer.

We suggest to use another great tool for React development: **React Developer Tools**. It is an extension available for Google Chrome and Mozilla browsers. With this tool you can inspect all your React's code. It is very useful and you should use it.

There is many ways in which we can start a React project, for this tutorial we have chosen create it through the `create-react-app` npm module. So, just open your terminal, enter on the location where you want to create the project and type the next: `npm install -g create-react-app`, press enter and after a few seconds this module will be installed, then type: `create-react-app [my-first-app]`. Here we are creating our React project named `my-first-app`, this may take some minutes. When it is done, enter in the new folder created and then type: `npm start`. That's it, we have our first React application running on the browser.

The `create-react-app` command creates a folder with the name specified and inside of this folder we have some things that we are discussing.

Ok, let's start to see some React code. Open the `index.js` file. This file is the entry point of your application. We have the following stuff inside this file:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```
At the top of the file we have some `import` statements. Here we are importing some stuff from other files like `React` from `react` and ReactDOM  from `react-dom`, both of them are React modules. Also, we are importing a component from `./App`, we will see what a component is later, the corresponding CSS file and other stuff as the `registerServiceWorker` which is out of scope of this tutorial but you can take a look inside.

You may notice that we are handling with relative paths when import something made by us. For example, the `App` component file is in the same folder that the `index.js` file, so we only have to put `./App` as the path from which we are going to import. If it was in other folder we have to manage this paths as one dot means same level, two dots means one level up, and so on.

Next, we have this line:
```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```

When you are in React's world you are just building components that fit into other components. Everything is a component. Unfortunately not everything around you is built using React. At the root of your tree you still have to write some plumbing code to connect the outer world into React.

Here is where the `ReactDOM.render` comes into action. `ReactDOM.render(reactElement, domContainerNode)` It takes two arguments: the react element to render and the DOM node where that element is going to take place.

What is `<App />`?, Well is a component and it will be rendered in a `<div />` DOM element, which you can find in the `index.html` file on the `public` folder. In this case `<App />` is called as our root component, but you can put a simple HTML tag. Go to your `index.js` file and change it!

```javascript
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
```

Now it renders a header saying "Hello World!" on the page.

## Introducing JSX

Ok, let's continue seeing more code. Take a look of the following line


```javascript
const element = <h1>Hello, world!</h1>;
```

This tag syntax is called JSX and is neither a string nor HTML. It is an extension to JavaScript and we can use it with React to describe what the UI should look like. JSX produces React elements.

#### Embedding expressions in JSX

Take a look of the next piece of code:

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

What's going on here. Well, JSX in sight! First we defined a function to format a name passed as a parameter, then we define a new object called `user`, this object later will be passed as a parameter of the `formatName` function. Then we create a variable where we split JSX over multiple lines for readability. While it is not required, when doing this, it is recommended wrapping it in parenthesis to avoid the pitfalls of automatic semicolon insertion. Finally we pass this variable as a parameter of the `ReactDom.render` function,  remember that the first parameter of this function is the React element we want to render and the second the DOM node to place it. So, we write this HTML code, and in curly braces we can execute any JavaScript expression; in this case we are calling the `formatName` function with the user object. That's it, this is JSX and it will be like this ever, no matter how complex be the JavaScript expression or the amount of HTML code.

Try it yourself! Go to `index.js` file and copy the above code replacing the `ReactDOM.render()` method. Now, you would have to see "Hello, Harper Perez!"" on the page

#### Automatic Semicolon Insertion

In JavaScript, automatic semicolon insertion (ASI) allows one to omit a semicolon at the end of a line. While you always should write semicolons, knowing how JavaScript handles their omission is important knowledge, because it helps you understand code without semicolons and because it has effects in code with semicolons. The parser treats every new token as part of the current statement, unless there is a semicolon that terminates it. Let's see some examples.

```javascript
a = b + c
(d + e).print()
```

In the above example the ASI is not trigger because the opening parenthesis could follow `c` in a function call. It is interpreted as: `a = b + c(d + e).print();`

In the other hand, ASI may be applied in the following case: If a newline is encountered and followed by a token that cannot be added to the current statement, a semicolon is inserted:

```javascript
if (a < 0) a = 0
console.log(a)
```

The result would be:

```javascript
if (a < 0) a = 0;
console.log(a);
```

So, as we can see the use of semicolons can be in a lot of cases unnecessary, but in other cases they help to have a more readable code and to avoid some parsing errors.

#### Standard insight!

If the semicolon is unnecessary **do not** use it!

#### Specifying Attributes with JSX

```javascript
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
```

In the first above line of code we can see how to specify an string literal attribute of an HTML element in JSX syntax. The only thing you have to do s to use quotes. In the second line we can see how to specify as an attribute a JavaScript expression, just use curly braces to embed the expression.

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

An HTML tag can be empty or has children. If it is empty you can close it by simply putting `/>`. Otherwise, if the tag has children you must not to.

#### Camel case

It is the practice of writing compound words or phrases such that each word or abbreviation in the middle of the phrase begins with a capital letter, with no intervening spaces or punctuation. The first letter of a compound word in camel case may or not be capitalized.

In JSX some HTML attributes use camel case, for example class becomes className and tabindex becomes tabIndex.

#### Standard insight!

Our standard for variables and function declarations is to use camel case with the first letter not capitalized.

Ok, that was a fast introduction to JSX, now let's see the `App.js` file, so go and open it!

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
Ok, inside of that file there are a lot of funny things, but let's start with the things we just learned: JSX. Yes, we have JSX syntax here. Look at the `<img />` tag, one of its attributes `src` has a JavaScript expression, in this case it is just the name of a variable, but remember that you can put all the JavaScript code you want by just wrapping it in curly braces.

Not sure at all? Well, let's put some a little more of JavaScript code:

Modify the file and make it that look like this:

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

Keep the other lines of the file equal and remember to go to `index.js` file and change it as it was at the beginning. Now, depending on the value of the variable `isReady` you will see "You're ready to start" or "You're not ready to start" on the page.

## Components and Props

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Conceptually, components are like JavaScript functions. They accept arbitrary inputs, called props, and return React elements describing what should appear on the screen. Note that the concepts of "component" and "element" are different. Elements are what components are made of.

There are two main different types of components: Functional and Class Components.

#### Class Components

Our `App.js` contains a class component. Here is the complete code:

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

The above snippet is a React component. We are using ES6 classes. All components made under this approach must extends from `React.Component` and always must have the `render` method, which is an special method from the React's lifecycle. You should use this syntax when you have to deal with manage the state (stateful components). So, in this kind of components you can have a constructor, the state and more methods of the lifecycle of React, as your own methods as well. Later we will see all this things.

Most of the time we construct components on independent file, so we can reuse it easily in several parts of our application. For instance, we are using this `App` component in our `index.js` file by importing it. So, how we can import a component in one place, it is because we first must export it. Look at the end of the `App.js` file, we will see this line of code:

`export default App;`

With this line we are able to use this component on any place of our application

#### Default or not default

There is a interesting thing when you want to export a component from an specific file. You can use `export default MyComponent` or just there is another way of do this without a default clause, so let's see when you can use default and when not.

Exporting without `default` means it is a "named export". You can have multiple named exports in a single file. So you can do this:

```javascript
export class MyComponent {...}
export class MySecondComponent {...}
```

First, as you can see, you must write `export` clause after the `class` clause. You can export as many components as you like from a single file, **but** then you have to import these exports using their exact names. For example, if we remove the `default` clause from our export statement in the `App.js` file, in the `indes.js` file, when we are importing this component, we have to change this line `import App from './App';` with this other: `import {App} from './App';`. Go ahead, try it yourself!

Alternatively if you export as the `default` export, you're free to rename the default export as you import it. If you component's name is `App` you can import it with the name you want. Try it yourself, let's go back to a `default` export in our `App.js` file and import it this way on the `index.js` file:
`import TheNameYouWant from './App';`. It is important that if you want to change the name of your component when import it, you should rename it with a significant name.

There ca only be one `default` export per file. In React it is a convention to export one component from a file, and to export it is as the default export. You can use the no default method when you want other kind of stuff like constants or functions.

#### Stateless Functional Components

```javascript
const HelloWorld = (props) => {
  return (
    <h1>Hello, {props.name}</h1>;
  )
}
```

The function above is a valid React component too,  because it accepts a single "props" object argument with data and returns a React element. We call such components "functional" because they are literally JavaScript functions.

#### Standard insight!

We are using arrow functions and for any functional component you should use it too. Also, note that in this case the name of the component is in camel case but with the first letter of the first word capitalized, any component, functional or not must follow this standard. Why this way? To differentiate it from HTML tags that are always lowercase.

This type of components are useful for dumb components, or also called presentational components. Presentational components focus on the UI rather than behavior, so it is important to avoid using state in presentational components, we will see what state is later. Instead, state should be managed by higher-level container components or via some architecture pattern like Flux or Redux (you can have a notion of what is and how to use this patterns on their respective tutorial). This kind of components do not support state or lifecycle methods.

#### Advantages of a stateless component

* Programatically Enforce keeping the component pure
* You are forced to put state management where it belongs: in higher level container components
* Require less typing
* Easy to understand: it is just a function that takes props and splits HTML
* Easy to test: Since it is a pure function, your assertions are very straightforward: Given an specific value for props, we can expect it to return an specific markup.

Let's have some practice. Change the `App` class component for a functional component:

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
As you can see, it still works fine. This is for demonstration only because `App` is higher-level component so it should be a class component, but both of them class and functional components are useful in different scenarios.

#### Props

Elements can also represent user-defined components, so when react sees an element representing a user-defined component, it passes JSX attributes to this component as a single object. We call this object "props". Props are immutable and is a way of passing data from parent to child.

Let's take our functional version of the `App` component and let's add the following:

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

What are we doing here? Well, we are using the `props` object and accessing an attribute inside called `name`. If you save in this moment the file and look for the result on the web page you only will see "Hello", this is because no one is passing down this prop. Props are passing top-down, meaning that someone have to pass the `props` object with a `name` attribute. So let's go to the `index.js` file and change this line:

```javascript
ReactDOM.render(<App name="Charlie"/>, document.getElementById('root'));
```

Save this file and now you should see on the page "Hello Charlie". `name` is now an attribute of the `<App />` element and these attributes in React are called props.

#### Prop validation

React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special `propTypes` property:

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

`PropTypes` exports a range of validators that can be used to make sure the data you received is valid. In this example, we are using `PropTypes.string`. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, `propTypes` is only checked in development mode. If you want the complete list of validations you can go to the official documentation [here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html).

#### Composing Components

Components can refer to other components in their output. This lets us the same component abstraction for any level of detail. Let's see the next example:

Create a new file called `hello.js` and paste the following code in that file:

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

Now change de `App.js` file this way:

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

OK, what's going on here? First we are creating a new functional component called `Hello` and that component just render some headers that say "Hello" in several languages. It receives via props two attributes one called `name` and another one called `lastName`. We import this component in our `App` component and inside the `return` we place it, and we pass it down the respective props. One prop comes from the `props` object that receives the `App` component and the other one is a variable defined in the `App` component.

So, the props can pass down from one component to other as many levels as you need, and components also could have as many props as you need.

## State

State is similar to props, but it is private and fully controlled by the component. It is the heart of every react component. It determines how that component renders and behaves. As we mentioned before the components defined as classes have some additional features. Local state is exactly that: a feature available only to classes.

#### Adding local state to a class

To add a state to our class component we need to add a class constructor first that assigns the initial state. So, go and convert the `App` component in a class component again. Add the next piece of code to the class:

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

Note how we pass `props` to the base constructor. Class components should always call the base constructor with `props`. The above component has an initial state. When you doing `this.state = {}`, all the things inside the curly brackets are part of the component's state. On this case the local state of our component has only one thing, the `isReady` attribute. Note how we can access it in the `render` method, we have to do `this.state.isReady`.

#### Using State Correctly

You must not modify state directly: `this.state.isReady = true`, this is a wrong way of do that and will not re-rendered a component. Instead, use `setState()`: `this.setState({isready: true})`. The only place where you can assign `this.state` is the constructor.

#### setState()

This method enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. Think of `setState()` as a request rather than an immediately command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.

As we saw, we can just call `setState()` with a new value by passing in an object to the function: `this.setState({isReady: true})`. But, often there is a need to update our component's state using the current state of the component. Directly accessing `this.state` to update our component is not a reliable way. So, we also can pass in a function and reliably get the value of the current state of our component:

```javascript
this.setState((prevState, props) => { return {isReady: !prevState.isReady}})
```

Passing in a function into `setState()` instead of an object will give you a reliable value for your component's `state` and `props`. If you know you are going to use `setState()` to update your component and you know you are going to need the current state or the current props of your component to calculate the next state, passing in a function as the first parameter instead of an object is the recommended solution.

We are going to see where to call this function later

## The component lifecycle

Each component has several lifecycle methods that you can override to run code at particular times in the process. Methods prefixed with `will` are called right before something happens, and methods prefixed with `did` are called right after something happens.

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

Let's take a look inside each of these methods

#### render()

The `render()` method is required. When called, it should examine `this.props` and `this.state` and return a single React element. You can also return `null` or `false` to indicate that you don't want anything rendered. the `render()` method should be pure, meaning that is does not modify component state, it returns the same result each time it is invoked, and it does not directly interact with the browser. If you need to interact with the browser, perform your work in `compinentDidMount()` or the other lifecycle methods instead. Keeping `render()` pure makes components easier to think about. This means you should not call `setState()`, query the Native UI or anything else that can mutate the existing state of the application. The reason why is if we do this kind of interaction in `render()`, then it will kickoff another render pass. Which once again, triggers `render()` which then does the same thing over and over. Let's take a look of what are we talking about:

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

This method is called before it is mounted. When implementing the constructor for `React.Component` subclass, you should call `super(props)` before any other statement. Otherwise, `this.props` will be undefined in the constructor, which can lead to bugs. Not all React components need a `constructor`, you only need to have this method when you want to have an initial state, as the above example, or when you have to `bind` some functions, we will discuss this subject later.

If you have a constructor on your class, you always need to call `super()` if you would like to set a property or access `this` inside the method, and if you need to access the props inside the `constructor` of the class then you need to call `super(props)`.


#### componentWllMount()

This method is invoked immediately before mounting occurs. Its is called before `render()` method, therefore setting state synchronously in this method will not trigger a re-rendering. In this method you can't do anything that involves the DOM because there is no component to play with yet. When this method is triggered nothing has changed since your component's constructor was called, which is where you should be setting up your component's default configuration. In this method you can do any setup that can only be done at runtime as connecting to external API's, so you will need to get that set up as your app is first mounting. But this kind of configurations should be done at the highest level component of your app, so the most probably is that you don't have to use this method at all.

#### componentDidMount()

`componentDidMount()` is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.

#### componentWillReceiveProps()

`componentWillReceiveProps()` is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method. Note that React may call this method even if the props have not changed, so make sure to compare the current and next values if you only want to handle changes. This may occur when the parent component causes your component to re-render. Here is an example of how to use this method:

```javascript
componentWillReceiveProps(nextProps) {
  if (nextProps.isUnderstadingReact !== this.props.isUnderstadingReact) {
    this.setState({isReady: !this.state.isReady})
  }
}
```

Ok, what's going on here? Let's think that we have an attribute called `isUnderstadingReact` in our local state. That attribute represents if you are "understanding React", if this attribute is passed as a prop to our component, we can verify if it has changed by doing a simple comparison between `nextProps.isUnderstadingReact` and `this.props.isUnderstadingReact`. If different, we can perform an update to our local state, if keeping equals do nothing.

#### shouldComponentUpdate

Use this method to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in vast majority of cases you should rely on the default behavior. Typical React dogma says that when a component receives new props, or new state, it should update. `shouldComponentUpdate` should always return a boolean, an answer to the question, "should I re-render?"

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.something !== this.props.something
}
```

OK, we are saying: if There was a change on some prop, let's update our component, but if no change was done, not re-render.

#### componentWillUpdate

Functionally. it is basically the same as `componentWillReceiveProps`, except you are not allowed to call `this.setState`. If you were using `shouldComponentUpdate` and needed to do something when props change, this method has change. Bu it is probably not going to give you a whole lot of additional utility.

#### componentDidUpdate

Here we can do the same stuff we did in `componentDidMount`, reset your layout, redraw your canvas, etc.

#### componentWillUnmount

Here you can cancel any outgoing network requests, or remove all event listeners associated with the component.

## Handling Events

ok, let's define a method in our `APP` component:

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
OK, we will see what's going on here. We are defining a new method called `handleClick`. In this method we change the local state of our component. In `render` method we added a `button` tag and as the `onClick` attribute of that tag we pass it the name of the method. Notice two important things here. First the attribute is `onClick`, camel case definition and not common html `onclick` definition. Second, when you pass the function as the attribute of the `button` tag you have to do `this.handleClick`. You have to do this to reference the name of the function, and it's only the function name, no parenthesis needed. Finally, we have this in `constructor` method: `this.handleClick = this.handleClick.bind(this)`, `this` `this` and more `this`, what does mean that. In JavaScript, class methods are not bound by default. If you forget to bind `this.handleClick` and pass it to `onClick`, `this` will be `undefined` when the function is actually called. If you refer to a method without `()` after it, you should bind that method, it is just JavaScript functions behavior.

## List and Keys

We can render multiple components using JavaScript methods such `map` or `forEach`.

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

In the above example we loop through the `numbers` array using the `map` function. We return an `<li>` element for each itm. Finally, we assign the resulting array of elements to  `listItems`. Then we include the entire `listItems` array inside a `<ul>` element, and render it to the DOM.

#### Keys

Keys help React identify which items have changed, are added, or a removed. Keys should be given to the elements inside the array to give the elements a stable identify. Let's do an example of multiple rendering with keys.

First, create a file named `list.js` and copy the following code:

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

Here we are defining a new component. This component will receive a `props` object with the `name` and the `descrption` of one supply. Then We will return that information in headers within a list element.

Now, let's create another file named `supplies.js`. Copy the next code:

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

Here we are just defining an object that contains some other objects inside, each one represents a supply.

Now, go to the `App.js` file to modify our `App` component:

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

First, we are importing the new component and the object with the supplies information. Here comes the interesting stuff. In the `render` method we are creating a `<ul>` element and inside this element we are creating iterative a list of supplies. `Object.keys()` receives an object and it will return each one of the keys of that object, in this case it will return `supply1`, `supply2` and `supply3`. So, we can do a `map` over those values and therefor the `map` function receives the `key` as a parameter and creates a `<ListSupply>` element for each `key` on the `MyStockList` object. The `<ListSupply>` element receives one of the values of that object as a prop, then that component process the props and displays the content.

## Controlled Components

Ok let's see more components, in this case special components to manage forms. But what are the characteristics of a controlled component? they have functions to govern the data going into them on every `onChange` event, rather than grabbing the data only once. This governed data is then saved to state (in this case, the parent/container component's state). Data displayed by a controlled component is received through props passed down from its parent/container component.

This is a one way loop. Data goes from child component input to parent component state and back down to the child component via props. This is what in React application architecture we call undirectional data flow.

So, let's create a form component as a controlled component. Create a new file named `form.js` and copy the following code:

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

What are the interesting things on this component? Well, as we saw in the description of what a controlled component is, this component has a method to handle changes and a method to submit the form. The `handleChange` method looks for the `name` and the `value` of the form element that has changed and update the local state with that information as a pair of `key` and `value`. Note that we are using the handy ES6 computed property name syntax to update the state key corresponding to the given input name:

```javascript
this.setState({[name]: value})
```

Therefore it is important that every form element in this case has a name, so we van later access it by this name and get its corresponding value.

Note that in this case there is no initial state, we don't have any pair of `name` and `value` when this component is created, this is the same as we'd have had an initial state like `this.state =  {name: null}` or something like that, not necessary at all.

Ok now go to `App.js` file import our form component, place it in the `render` method and see prove it! If you for the first time leave one of the `inputs` empty and click the submit bottom you will se something like "Charlie undefined", or "undefined Brown" depending on which `input` you left empty. This is because the first time no key with `name` or `lastName` resides in the `state` of the component and in the `handleSubmit` method we are accessing that values, well maybe have always an state in our components is useful. Add that line of code to the component to confirm the change on the behavior.

## Lifting State Up

To share a state between two components, the most common operation is to move it up to their closest common ancestor. This is called "lifting state up", in other words removing the local state from the descendant component and move it into its ancestor instead. So, we want to have a shared state: when we update an input, an other component should reflect the change and vice versa. the descendant component become controlled. Lifting state involves writing more boilerplate code that two-way approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state lives in some component and that component alone can change it, the surface area for bugs is greatly reduced.

How it works? Well [here](https://facebook.github.io/react/docs/lifting-state-up.html) are a complete and an extensive tutorial on how accomplish it, but basically if we have two components each one with its own state and we want to update one of them in response to changes in the other, we need to move up both local states. This means create an ancestor component that wraps the children components with a unique source of information and pass down this information via props.

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
