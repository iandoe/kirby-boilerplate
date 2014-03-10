var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({camelize: true});

gulp.task('watch', function() {
    gulp.watch('assets/sass/**/*.scss', ['css', 'imagemin']);
    gulp.watch('assets/js/main.js', ['js']);
    gulp.watch('assets/js/libs/*.js', ['jsplugins']);
    // gulp.watch('assets/img/src/*.png', ['imagemin']);
});

gulp.task('css', function() {
    return gulp.src('assets/sass/style.scss')
        .pipe(plugins.compass({
            config_file: 'config.rb',
            sass: 'assets/sass',
            css: 'assets/css'
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
        .pipe(plugins.notify("CSS Succesfully Compiled"))
});

gulp.task('js', function() {
    return gulp.src('assets/js/main.js')
        .pipe(plugins.imports())
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/js'))
        .pipe(plugins.notify("Main JS Compiled"))
});

gulp.task('jsplugins', function() {
    return gulp.src('assets/js/libs/*.js')
        .pipe(plugins.concat("plugins.js"))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/js'))
        .pipe(plugins.notify("JS Plugins Compiled"))
});

gulp.task('imagemin', function() {
    return gulp.src('assets/img/src/*')
    .pipe(
        // plugins.cache(
        plugins.imagemin({
            optimizationLevel: 5,
            progressive: false,
            interlaced: true
        })
        // )
    )
    .pipe(gulp.dest('assets/img'))
    .pipe(plugins.notify("Images Compressed"))
});