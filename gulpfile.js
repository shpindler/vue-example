import path from 'path'
import gulp from 'gulp'
import sass from 'gulp-sass'
import cleanCss from 'gulp-clean-css'

sass.compiler = require('node-sass')

const APP_PATH = process.env.APP_PATH || '../ssuz'

function buildExtTheme() {
  return gulp
    .src('./assets/scss/ext-theme.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest(path.resolve(APP_PATH, 'static/css')))
}

function copyStatic() {
  return gulp
    .src('./static/nuxt-static/**/*')
    .pipe(gulp.dest(path.resolve(APP_PATH, 'static/nuxt-static')))
}

gulp.task('ext-theme-dev', (cb) => {
  buildExtTheme()
  copyStatic()
  gulp.watch('./assets/scss/ext-theme.scss', buildExtTheme)
  gulp.watch('./static/nuxt-static/*', copyStatic)
  cb()
})
