
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
