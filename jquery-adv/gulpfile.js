const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

const src_dir = './app';
const dist_dir = './dist';

const paths = {
	sass : {
		entry: [
			`${src_dir}/css/main.scss`,
			`${src_dir}/css/test/test.scss`,
			`${src_dir}/css/sizes/sizes.scss`,
		],
		src: `${src_dir}/css/**/*.scss`,
		dist: `${dist_dir}/css`
	}
}

gulp.task('sass', () => {
	return gulp.src(paths.sass.entry)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers : ['> 5%'],
			cascade : false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.sass.dist))
});

gulp.task('watch', () => {
	gulp.watch(paths.sass.src, ['sass']);
});

gulp.task('default', ['sass', 'watch']);

