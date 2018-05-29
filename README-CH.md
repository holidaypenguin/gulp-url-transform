
# gulp-url-transform
> 将参考路径替换为文件内的特定路径。

[![npm](https://nodei.co/npm/gulp-url-transform.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-url-transform/)

## Install


```
npm install --save-dev gulp-url-transform
```

## 例子

gulp js 代码

```js
const transform = require("gulp-url-transform");

gulp.task("build:absolute:all", ()=>{
    gulp.src("./t_static/**/**")
        .pipe(transform.toAbsolute())
        .pipe(gulp.dest('./t_static/'));
});
```

文件输入代码

```css
body{
    background-image: url(__uri(../images/bg1.png));
}
```

文件输出代码
```css
body{
    background-image: url("/t_static/business/images/bg1.png");
}
```

## 用法

假设你有如下这个结构:

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
在 `/t_static/business/css/index.css` 中有如下内容:

```css
body{
    background-image: url(__uri(../images/bg1.png));
}
```

在 `/t_static/business/js/index.js` 中有如下内容:

```js
let file = "__uri(../images/bg.png)";
```

在 `/t_static/business/input.html` 中有如下内容:

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

在 `/gulp.js` 中有如下内容:

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

执行 `gulp` 命令

输出 `/t_static/business/css/index.css` 如下内容:

```css
body{
    background-image: url("/t_static/business/images/bg1.png");
}
```

输出 `/t_static/business/js/index.js` 如下内容:

```js
let file = "/t_static/business/images/bg.png";
```

输出 `/t_static/business/input.html` 如下内容:

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

## 扩展用法
在替换前和替换后对指定路径进行修改

```
gulp.src("./t_static/**/**")
    .pipe(transform.toAbsolute({
        debug: true,
        before(relPath, file){
            return relPath;
        },
        after(absPath, file){
            // return "http://www.baidu.com"+absPath;
            return absPath;
        }
    }))
    .pipe(gulp.dest('./t_static/'));
```

## API 接口

### 替换成绝对路径

`transform.toAbsolute(options)`
* `options`:
    * `base`: (默认 `.`) 文档根的路径.
    * `keyword`: (默认 `__uri`) 转换这个关键字包含的URL.
    * `debug`:(默认 `false`) 是否显示转换信息
    * `before`: (默认空方法 `(relPath, file) => relPath`) 转换前调用
        * `relPath`: 待转换的相对路径
        * `file`: 转换路径所在文件
            * `path`: 文件路径
            * `contents`: 文件内容
    * `after`: (默认空方法 `(absPath, file) => absPath`) 转换后调用
        * `absPath`: 转换后的绝对路径
        * `file`: 转换路径所在文件
            * `path`: 文件路径
            * `contents`: 文件内容

### 替换成相对路径

`transform.toRelative(options)`
* `options`:
    * `base`: (默认 `.`) 文档根的路径.
    * `keyword`: (默认 `__uri`) 转换这个关键字包含的URL.
    * `debug`:(默认 `false`) 是否显示转换信息
    * `before`: (默认空方法 `(absPath, file) => absPath`) 转换前调用
        * `absPath`: 待转换的绝对路径
        * `file`: 转换路径所在文件
            * `path`: 文件路径
            * `contents`: 文件内容
    * `after`: (默认空方法 `(relPath, file) => relPath`) 转换后调用
        * `relPath`: 转换后的相对路径
        * `file`: 转换路径所在文件
            * `path`: 文件路径
            * `contents`: 文件内容

## License

Gulp-url-transform is licensed under the MIT license. (http://opensource.org/licenses/MIT)

Copyright (c) 2017-present