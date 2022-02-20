const { src, dest, watch, series } = require('gulp');
const terser = require("gulp-terser");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const concat = require("gulp-concat");

//css
function cssminify() {
    return src('css/*.css')
        .pipe(minify())
        .pipe(prefix())
        .pipe(dest('dist/css'));
};

//js
function jsmin() {
    return src("js/*.js")
        //.pipe(concat('main.js'))
        .pipe(terser({ mangle: false }))
        .pipe(dest('dist/js'))
}

//html
function htmlpass() {
    return src("*.html")
        .pipe(dest("dist/"))

}

//watch
function Watch() {
    watch("css/*.css", cssminify);
    watch("js/*.js", jsmin);
    watch("*html", htmlpass);
}

exports.default = series(
    cssminify,
    jsmin,
    htmlpass,
    Watch,
)