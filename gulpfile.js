const gulp = require('gulp');
const imageresize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
const del = require('del');
const minifyCss = require("gulp-minify-css");
const pngquant = require('imagemin-pngquant');

const imagesFormat = [
    // { folder: 'bg', width: 1200, crop: false, upscale: false },
    { folder: 'categories', width: 500, height: 300, upscale: false, crop: false },
    { folder: 'projects', width: 800, height: 600, upscale: false, crop: false },
];



const paths = {
    js: {
        vendor: ["./src/js/vendor/*.js"],
        src: ["./src/app/app.js", "./src/app/settings/*.js", "./src/app/services/*.js", "./src/app/directives/*.js"
            , "./src/app/components/*.js", "./src/app/controllers/*.js", "./src/js/*.js"],
        dest: "./dist/js/"
    },
    css: {
        vendor: ["./src/css/vendor/*.css"],
        src: ["./src/css/*.css"],
        dest: "./dist/css/"
    },
    fonts: {
        src: ["./src/fonts/*"],
        dest: "./dist/fonts/"
    },
    images: {
        folder: 'images/',
        src: ["./src/img/**/*"],
        dest: "./dist/img/"
    },
    views: {
        src: ["./src/views/*"],
        dest: "./dist/views/"
    },
    products: {
        src: ["../products/**/*.jpg"],
        dest: "./dist/images/products/"
    }

};


gulp.task('img-resize', function () {
    
    imagesFormat.forEach(function (type) {
        gulp.src(paths.products.src)
            .pipe(imageresize({
                width: type.width,
                height: type.height,
                crop: type.crop,
                upscale: type.upscale
            }))
            .pipe(gulp.dest( paths.products.dest + type.folder));
    })
});


gulp.task('views', function () {
    gulp.src(paths.views.src)
        .pipe(gulp.dest(paths.views.dest))
});

gulp.task('fonts', function () {
    gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
});

gulp.task('vendor-css', function () {
    gulp.src(paths.css.vendor)
        .pipe(gulp.dest(paths.css.dest))
});

gulp.task('css', ['vendor-css', 'fonts'], function () {
    gulp.src(paths.css.src)
        .pipe(concat("style.min.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.css.dest));
});

gulp.task('vendor-js', function () {
    return gulp.src(paths.js.vendor)
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('js', ['vendor-js'], function () {
    return gulp.src(paths.js.src)
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});


gulp.task('clean', function () {
    return del(['dist/img']);
});

// Copy all static images
gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images.src)
        // Pass in options to the task
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(paths.images.dest));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.js.src, ['js']);
    gulp.watch(paths.css.src, ['css']);
    gulp.watch(paths.views.src, ['views']);
    console.log("gulp is watching your files ");
});

// imagemin pour minfier le dossier images

gulp.task('imagemin', function () {
    const imgSrc = 'src/images/**',
        imgDst = 'dist/images';
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
});

// The default task (called when you run `gulp` from cli)

// 'watch', 'images',
gulp.task('default', ['views', 'css', 'js']);
