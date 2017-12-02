/**
 * 	Plane theme
 *	Copyright (C) 2017  wfpaisa
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 *	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.en.html>.
 *
 * @author    @wfpaisa
 * @copyright 2017 Plane theme
 */

"use strict";
var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	del = require('del'),
	exec = require('child_process').exec,
	watch = require('gulp-watch'),
	sass = require('gulp-sass');



gulp.task('sass', function () {
  return gulp.src('./src/gtk-3.0/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/Plane/gtk-3.0'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/gtk-3.0/**/*.scss', ['sass']);
});


/*====================================
=           .Render icons.           =
====================================*/
gulp.task('default', ['sass'], (cb) => {
	// gulp.src('./src/**/*')
	// 	.pipe(svg_icons_export())
	// 	.pipe(gulp.dest(__dirname))
	// 	.on('end', cb);
});
