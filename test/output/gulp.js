/*
* @Author: songshipeng
* @Date:   2017-12-19 18:44:26
* @Email:  songship1221@sina.com
* @Last Modified by:   songshipeng
* @Last Modified time: 2018-05-29 13:26:05
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
            debug: true,
            before(relPath, file){
                return relPath;
            },
            after(absPath, file){
                // return "http://local.rongyi.com"+absPath;
                return absPath;
            }
        }))
        .pipe(gulp.dest('./t_static/'));
});
