const { series, parallel, src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("dart-sass"));
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

sass.compiler = require("dart-sass");

//utilidades CSS
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

// utilidades js
const terser = require("gulp-terser-js");
const rename = require("gulp-rename");

const paths = {
    imagenes: "src/img/**/*",
    scss: 'src/scss/**/*.scss',
    js: "src/js/**/*.js",
    vendorJS: "src/vendor/js/**/*.js",
    vendorCSS: "src/vendor/css/**/*.css",
    vendorWebFonts: "src/vendor/webfonts/**/*.*",
}

function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./build/css"));
}

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js"))
        .pipe(terser({
            toplevel: true
        }))
        .pipe(sourcemaps.write("."))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("./build/js"));
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest("./build/img"))
    //.pipe(notify({ message: 'Imagen Minificada' }));
}

function vendorJS() {
    return src(paths.vendorJS)
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js"))
        .pipe(terser({
            toplevel: true
        }))
        .pipe(sourcemaps.write("."))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("./build/vendor/js"));
}

function vendorCSS() {
    return src(paths.vendorCSS)
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.css"))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./build/vendor/css"));
}

function vendorWebFonts() {
    return src(paths.vendorWebFonts)
        .pipe(dest("./build/vendor/webfonts"));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest("./build/img"))
    //.pipe(notify({ message: 'Versi??n webP lista' }));
}

function watchArchivo() {
    watch(paths.scss, css);
    watch(paths.js, javascript);
    watch(paths.imagenes, imagenes);
}

exports.css = css;
exports.watchArchivo = watchArchivo;
exports.imagenes = imagenes;

exports.default = parallel(css, javascript, imagenes, versionWebp, watchArchivo, vendorJS, vendorCSS, vendorWebFonts);