const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('scripts', () => {
    return gulp.src('*.es6')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(''));
});

gulp.task('watch', () => {
    gulp.watch('*.es6', ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);