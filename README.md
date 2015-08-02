# Angular Shapeshift directive

This directive allows you to Drag and Drop, supports Sortable, Draggable and Trash container.

## Requirements

- jQuery
- jquery.Shapeshift v2.0+
- AngularJS v1.4+

## Usage

Load the script file: angular-shapeshift.js in your application:

```html
<script type="text/javascript" src="src/angular-shapeshift.js"></script>
```

Add the ngShape module as a dependency to your application module:

```js
var myAppModule = angular.module('MyApp', ['ngShape'])
```

Apply the directive:

```html
<ng-shape ng-model="items" options="conf"></ng-shape>
```

### Options

All the [jquery.Shapeshift options](https://github.com/McPants/jquery.shapeshift/wiki/2.0-api-documentation) can be passed through the directive.

## Demo

http://mcpants.github.io/jquery.shapeshift/
