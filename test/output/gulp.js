
const gulp = require("gulp");
const transform = require("../../src/index");

gulp.task("test:build", ["build:css", "build:js", "build:html"], function(){
    
});

gulp.task("test:move", ["move:css", "move:js", "move:html"], function(){
    
});

gulp.task("build:css", ()=>{
    gulp.src("./t_static/**/*.css")
        .pipe(transform.toAbsolute({
            debug: true,
        }))
        .pipe(gulp.dest('./t_static'));
});

gulp.task("build:js", ()=>{
    gulp.src("./t_static/**/*.js")
        .pipe(transform.toAbsolute({
            debug: true,
        }))
        .pipe(gulp.dest('./t_static'));
});

gulp.task("build:html", ()=>{
    gulp.src("./t_static/**/*.html")
        .pipe(transform.toAbsolute({
            debug: true,
        }))
        .pipe(gulp.dest('./t_static'));
});

gulp.task("move:css", ()=>{
    gulp.src("../business/**/*.css")
        .pipe(gulp.dest('./t_static'));
});

gulp.task("move:js", ()=>{
    gulp.src("../business/**/*.js")
        .pipe(gulp.dest('./t_static'));
});

gulp.task("move:html", ()=>{
    gulp.src("../business/**/*.html")
        .pipe(gulp.dest('./t_static'));
});