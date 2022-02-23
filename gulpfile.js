const { src, dest, watch, series } = require('gulp');
const terser = require("gulp-terser");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const concat = require("gulp-concat");

//css
function cssminify() {
    return src('src/css/*.css')
        //.pipe(minify())
        //.pipe(prefix())
        .pipe(dest('\css'));
};

//js
function jsmin() {
    return src("src/js/*.js")
        //.pipe(concat('main.js'))
        //.pipe(terser({ mangle: false }))
        .pipe(dest('\js'))
}

//html
function htmlpass() {
    return src("src/*.html")
        .pipe(dest("\."))

}

//watch
function Watcher() {
    watch("css/*.css", cssminify);
    watch("js/*.js", jsmin);
    watch("*.html", htmlpass);
}

exports.default = series(
    cssminify,
    jsmin,
    htmlpass,
    // Watcher,
)