
# gulp-url-transform
> Change the reference path to a specific location inside the file.

[![npm](https://nodei.co/npm/gulp-url-transform.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-url-transform/)

[README-CH.md](https://github.com/holidaypenguin/gulp-url-transform/blob/master/README-CH.md)

## Install

```
npm install --save-dev gulp-url-transform
```

## Examples

gulp js

```js
const transform = require("gulp-url-transform");

gulp.task("build:absolute:all", ()=>{
    gulp.src("./t_static/**/**")
        .pipe(transform.toAbsolute())
        .pipe(gulp.dest('./t_static/'));
});
```

file in

```css
body{
    background-image: url(__uri(../images/bg1.png));
}
```

file out
```css
body{
    background-image: url("/t_static/business/images/bg1.png");
}
```

## Usage

Let's say you have this structure:

```tcl
t_static
|-- business
|   |-- css
|   |   `-- index.css
|   |-- image
|   |   `-- bg.png
|   |--js
|   |   `-- index.js
|   `--index.html
`-- gulp.js
```
In `/t_static/business/css/index.css` you might have:

```css
body{
    background-image: url(__uri(../images/bg1.png));
}
```

In `/t_static/business/js/index.js` you might have:

```js
let file = "__uri(../images/bg.png)";
```

In `/t_static/business/input.html` you might have:

```html
<!DOCTYPE html>
<html>
<head>
    <title>首页</title>
    <link rel="stylesheet" href="__uri(./css/index.css)">
</head>
<body>

</body>
</html>
```

In `/gulp.js` you might have:

```js
const gulp = require("gulp");
const transform = require("gulp-url-transform");

gulp.task("default", ()=>{
    gulp.src("./t_static/**/**")
        .pipe(transform.toAbsolute({
            debug: true
        }))
        .pipe(gulp.dest('./t_static/'));
});
```

`gulp`

Out `/t_static/business/css/index.css` :

```css
body{
    background-image: url("/t_static/business/images/bg1.png");
}
```

Out `/t_static/business/js/index.js` :

```js
let file = "/t_static/business/images/bg.png";
```

Out `/t_static/business/input.html` :

```html
<!DOCTYPE html>
<html>
<head>
    <title>首页</title>
    <link rel="stylesheet" href="/t_static/business/css/index.css">
</head>
<body>

</body>
</html>
```



## API

### Conversion into absolute path

`transform.toAbsolute(options)`
* `options`:
    * `base`: (default `.`) The path of document root.
    * `keyword`: (default `__uri`) Convert the url that this keyword contains.
    * `debug`:(default `false`) Whether to display conversion information.
    * `before`: (default `(relPath, file) => relPath`) Call before replacement.
        * `relPath`: Relative path to replace.
        * `file`: Replace the path where the file.
            * `path`: file path
            * `contents`: document content
    * `after`: (default `(absPath, file) => absPath`) Call after replacement.
        * `absPath`: Replaced absolute path
        * `file`: Replace the path where the file.
            * `path`: file path
            * `contents`: document content

### Conversion into relative path.

`transform.toRelative(options)`
* `options`:
    * `base`: (default `.`) The path of document root.
    * `keyword`: (default `__uri`) Convert the url that this keyword contains.
    * `debug`:(default `false`) Whether to display conversion information.
    * `before`: (default `(absPath, file) => absPath`) Call before replacement.
        * `absPath`: Absolute path to replace.
        * `file`: Replace the path where the file.
            * `path`: file path
            * `contents`: document content
    * `after`: (default `(relPath, file) => relPath`) Call after replacement.
        * `relPath`: Replaced relative path
        * `file`: Replace the path where the file.
            * `path`: file path
            * `contents`: document content

## License

Gulp-url-transform is licensed under the MIT license. (http://opensource.org/licenses/MIT)

Copyright (c) 2017-present