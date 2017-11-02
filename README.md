# postcss-center

<img align="right" width="135" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/logo-leftp.png">

[![NPM version](http://img.shields.io/npm/v/postcss-center.svg?style=flat)](https://www.npmjs.org/package/postcss-center)
[![npm license](http://img.shields.io/npm/l/postcss-center.svg?style=flat-square)](https://www.npmjs.org/package/postcss-center)
[![Travis Build Status](https://img.shields.io/travis/jedmao/postcss-center.svg)](https://travis-ci.org/jedmao/postcss-center)
[![codecov](https://codecov.io/gh/jedmao/postcss-center/branch/master/graph/badge.svg)](https://codecov.io/gh/jedmao/postcss-center)
[![Dependency Status](https://gemnasium.com/badges/github.com/jedmao/postcss-center.svg)](https://gemnasium.com/github.com/jedmao/postcss-center)

[![npm](https://nodei.co/npm/postcss-center.svg?downloads=true)](https://nodei.co/npm/postcss-center/)

[PostCSS](https://github.com/postcss/postcss) plugin to center elements.

## Introduction

Centering elements in CSS [isn't exactly straight-forward](http://www.w3.org/Style/Examples/007/center.en.html), but we can change that!

```css
.foo {
	top: center;
	left: center;
}
```

Transpiles into:

```css
.foo {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%)
}
```

Of course, you don't have to include both `top` and `left`:

```css
.foo {
	top: center;
}
```

Transpiles into:

```css
.foo {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}
```

Or...

```css
.foo {
	left: center;
}
```

Transpiles into:

```css
.foo {
	position: absolute;
	left: 50%;
	margin-right: -50%;
	transform: translateX(-50%);
}
```

That's about it!

### Conditions

- If the value of `top` or `left` is not `center` it will be preserved. If both are not `center`, this plugin will do nothing!
- If the rule already has a `position` it will only be preserved if its value is `relative` or `fixed`. All other values will be replaced with `absolute`.
- If the rule has a `position` of `relative` or the value of `left` is not `center`, the `margin-right` declaration will not be inserted.

## Installation

```
$ npm install postcss-center
```

## Usage

### JavaScript

```js
postcss([ require('postcss-center') ]);
```

### TypeScript

```ts
import * as postcssCenter from 'postcss-center';

postcss([ postcssCenter ]);
```

## Options

None at this time.

## Testing

Run the following command:

```
$ npm test
```

This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.

### Watching

For much faster development cycles, run the following commands in 2 separate processes:

```
$ npm run build:watch
```

Compiles TypeScript source into the `./dist` folder and watches for changes.

```
$ npm run watch
```

Runs the tests in the `./dist` folder and watches for changes.
