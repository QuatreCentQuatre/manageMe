const { src, dest } = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');

const sourceFiles = [
    'src/me.manage.js',
    'src/me.manage.view.js',
];
const distPath = 'dist/';

function js() {
    return src(sourceFiles)
        .pipe(gulpBabel())
        .pipe(dest(distPath))
        .pipe(gulpUglify())
        .pipe(gulpRename({ extname: '.min.js' }))
        .pipe(dest(distPath));
}

exports.build = js;