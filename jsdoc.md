# Introduction to JSDoc 3

## Table of contents

* [What is JSDoc 3](#what-is-jsdoc-3)
* [Installation](#installation)
* [Block Tags](#block-tags)
* [References](#references)

## What is JSDoc 3

JSDoc 3 is an API documentation generator for JavaScript. Documentation comments are added directly to the source code, right alongside the code itself. The JSDoc tool will scan the source code and generate an HTML documentation website.

JSDoc comments should generally be placed immediately before the code being documented. Each comments must start with a `/**` sequence in order to be recognized by the JSDoc parser. Comments beginning with `/*`, `/***` or more that 3 stars will be ignored.

## Installation

JSDoc supports NodeJs 4.2.0 or later.

To install the latest version on npm globally:

`npm install -g jsdoc`

To install the latest version on npm locally and save it in the `package.json` file:

`npm install --save-dev jsdoc`

To generate the documentation:

`jsdoc JavaScriptFile.js`

A configuration file to generate the documentation can also be used:

`jsdoc JavaScriptFile.js -c /path/to/my/conf.json`

By default, the generated documentation is saved in a directory named `out`. With the `-d` option is possible to specify another directory

For a complete list of command-line options run: `jsdoc --help`

## Block Tags

Usually provide detailed information about the code, such as the parameters that a function accepts. Always begin with an `@` sign. Each block tag must be followed by a line break, with the exception of the last block tag in a JSDoc comment. The following are some of the block tags more used but the entire list can be found in the official documentation [here](http://usejsdoc.org/)

#### @abstract

An abstract ES6 class

```JavaScript
/** @abstract */
class Foo {
  /** @abstract */
  bar () {}
}
```

#### @access

ES6 classes with different access levels

* Private

```JavaScript
/** @access private */
class Foo { ... }

Is the same as.

/** @private */
class Foo { ... }
```

* Protected

```JavaScript
/** @access protected */
class Foo { ... }

Is the same as:

/** @protected */
class Foo { ... }
```

* Package

```JavaScript
/** @access package */
class Foo { ... }

Is the same as:

/** @package */
class Foo { ... }
```

* Public

```JavaScript
/** @access public */
class Foo { ... }

Is the same as:

/** @public */
class Foo { ... }
```

#### @async

Indicates that a function is asynchronous, meaning that it was declared using the syntax `async function foo() {}`. Do not use this tag for other types of asynchronous functions, such as functions that provide a callback.

```JavaScript
/** @async */
async function foo(){ .. }
```

#### @augments

Also known as `@extends`. It's used to indicate that a symbol inherits from a parent symbol

```JavaScript
class Foo { ... }

/** @extends Foo */
class SubFoo extends Foo { ... }
```

#### @author

Indicates the author of an item. In JSDoc 3.2 and later, if the author's name is followed by an email address enclosed in angle brackets, the default template will convert the email address to a `mailto:` link.

```JavaScript
/** @author Charlie Brown <charlieb@example.com> */
```

#### @callback

provides information about a callback function that can be passed to other functions, including the callback's parameters and return value.

```JavaScript
/** @callback requestCallback */
```

#### @class

Intended to be called with the new ES6 keyword to return an instance.

```JavaScript
/** @class */
class Foo { ... }
```

#### @classdesc

Used to provide a description for a class

```JavaScript
/**
* @class
* @classdesc This is a description of the MyClass Class
*/
class MyClass { ... }
```

#### @constant

Used to mark the documentation as belonging to a symbol that is a constant. It's also known as @const

```JavaScript
/** @constant */
const RED = 'FF0000'
```

#### @constructs

Allows to document that a particular method will be used to construct instances of that class.

```JavaScript
/**
*@class
*@classdesc This class demonstrate the use of the @constructs tag
*/
class MyClass {
  /**@constructs*/
  constructor(arg1, arg2) { ... }
}
```

#### @deprecated

Marks a symbol in the code as being deprecated

```JavaScript
/** @deprecated since ES5 */
function old() { ... }
```

#### @description

This tag allows to provide a general description of the symbol that is being documented. If the symbol is described at the very beginning of a JSDoc comment, before using any block tags, the @description tag can be omitted.

```JavaScript
/** Add two numbers
* @param {number} a
* @param {number} b
*/
function add(a, b) { ... }

/**
* @param {number} a
* @param {number} b
* @description Add two numbers
*/
function add(a, b) { ... }
```

#### @function

This marks an object as being a function, even though it may not appear to be one to the parser.

```JavaScript
/** @function MyFunction */
function MyFunction() { ... }
```

#### @memberof

Identifies a member symbol that belongs to a parent symbol

```JavaScript
/**
* @class
* @classdesc This is a description
*/
class MyClass {
  /** @constructs */
  constructor() { ... }

  /**
  * @function myFunction
  * @param {number} a - This the parameter of the function
  * @return {number}
  * @memberof MyClass
  */
  myFunction() { ... }
}
```

#### @override

This tag indicates that a symbol overrides a symbol with the same name in a parent class.

```JavaScript
/**
* @class
* @classdesc This is a demonstration of the @override tag
*/

class MyClass {
  /** @constructs */
  constructor(model) {
    super(model)
  }

  /** @override */
  createModel() { ... }
}
```

#### @param

Provides the name, type and description of a function parameter.

```JavaScript
/**
* @param {number} a - This is a number
* @param {Object} employee - This is an object
* @param {string} employee.name - This is a property of the object
* @param {string} [b] - This parameter can be optional
*/
```

#### @return

Also known as @returns. This tag documents the value that a function returns.

```JavaScript
/**
* Returns the sum of a and b
* @param {number} a
* @param {number} b
* @returns {number}
*/
```

#### @todo

This tag allows to document tasks to be completed for some part of the code.

```JavaScript
/**
* @todo Write the documentation
* @todo Implement this function
*/

/** @function */
function foo() { ... }
```

## References

* [Official Documentation](http://usejsdoc.org/)
* [API Documentation](https://github.com/jsdoc3/jsdoc)
