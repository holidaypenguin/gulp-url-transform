
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
