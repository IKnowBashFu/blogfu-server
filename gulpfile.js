const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('default', () => {
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: [['env', {
                "targets": {
                    "node": "8.5.0"
                }
            }]]
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', () => {
    return watch('src/**/*.js', { ignoreInitial: false, verbose: true }, () => {
        gulp.src('src/**/*.js')
            .pipe(babel({
                presets: [['env', {
                    "targets": {
                        "node": "8.5.0"
                    }
                }]]
            }))
            .on('error', function (error) {
                this.emit('end', error);
            })
            .on('end', function (error) {
                if (error) {
                    console.error(error.message);
                }
                else {
                    console.log('Finished Compile');
                }
            })
            .pipe(gulp.dest('dist'))
    })
});
