/*
* @Author: songshipeng
* @Date:   2017-12-20 11:00:40
* @Email:  songship1221@sina.com
* @Last Modified by:   songshipeng
* @Last Modified time: 2017-12-21 10:56:56
*/

const gulp = require("gulp");

gulp.task("test:move", ["move:all"], function(){
    
});


gulp.task("move:css", ()=>{
    gulp.src("./business/**/*.css")
        .pipe(gulp.dest('./output/t_static/business'));
});

gulp.task("move:js", ()=>{
    gulp.src("./business/**/*.js")
        .pipe(gulp.dest('./output/t_static/business'));
});

gulp.task("move:html", ()=>{
    gulp.src("./business/**/*.html")
        .pipe(gulp.dest('./output/t_static/business'));
});

gulp.task("move:all", ()=>{
    gulp.src("./business/**/**")
        .pipe(gulp.dest('./output/t_static/business'));
});
