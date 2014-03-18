var gulp = require('gulp'),
    pkg = require('./package.json'),
    plugins = require('gulp-load-plugins')({camelize: true});

gulp.task('watch', function() {
    gulp.watch('assets/sass/**/*.scss', ['css', 'imagemin']);
    gulp.watch('assets/js/main.js', ['js']);
    gulp.watch('assets/js/libs/*.js', ['jsplugins']);
    // gulp.watch('assets/img/src/*.png', ['imagemin']);
});

gulp.task('css', function() {
    return gulp.src('assets/sass/style.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.compass({
            config_file: 'config.rb',
            sass: 'assets/sass',
            css: 'assets/css'
        }))
        .on("error", plugins.notify.onError({
            title: "💥 SCSS"
        }))
        .pipe(plugins.autoprefixer(
            "last 2 versions", "> 1%", "ie 9", "ie 8"
        ))
        .pipe(plugins.minifyCss({
            keepSpecialComments: 1,
            removeEmpty: true
        }))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/css'))
        // .pipe(plugins.livereload(server))
        .pipe(plugins.notify({
            message: "CSS Succesfully Compiled",
    }))
});

gulp.task('js', function() {
    return gulp.src('assets/js/main.js')
        .pipe(plugins.plumber())
        .pipe(plugins.imports())
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/js'))

});

gulp.task('jsplugins', function() {
    return gulp.src('assets/js/libs/*.js')
        .pipe(plugins.plumber())
        .pipe(plugins.concat("plugins.js"))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/js'))
        .pipe(plugins.notify("JS Plugins Compiled"))
});

gulp.task('imagemin', function() {
    return gulp.src('assets/img/src/*')
    .pipe(
        plugins.cache(
        plugins.imagemin({
            optimizationLevel: 5,
            progressive: false,
            interlaced: true
        })
        )
    )
    .pipe(gulp.dest('assets/img'))
    .pipe(plugins.notify({
        message: "Images Compressed",
        onLast: true
    }))
});