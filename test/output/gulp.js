/*
* @Author: songshipeng
* @Date:   2017-12-19 18:44:26
* @Email:  songship1221@sina.com
* @Last Modified by:   songshipeng
* @Last Modified time: 2017-12-21 10:57:57
*/

const gulp = require("gulp");
const transform = require("../../src/index");

gulp.task("test:absolute:build", ["build:absolute:all"], function(){
    
});



gulp.task("build:absolute:css", ()=>{
    gulp.src("./t_static/**/*.css")
        .pipe(transform.toAbsolute({
            debug: true,
        }))
        .pipe(gulp.dest('./t_static'));
});

gulp.task("build:absolute:js", ()=>{
    gulp.src("./t_static/**/*.js")
        .pipe(transform.toAbsolute({
            debug: true,
        }))
        .pipe(gulp.dest('./t_static'));
});

gulp.task("build:absolute:html", ()=>{
    gulp.src("./t_static/**/*.html")
        .pipe(transform.toAbsolute({
            debug: true,
        }))
        .pipe(gulp.dest('./t_static'));
});

gulp.task("build:absolute:all", ()=>{
    gulp.src("./t_static/**/**")
        .pipe(transform.toAbsolute({
            debug: true
        }))
        .pipe(gulp.dest('./t_static/'));
});
