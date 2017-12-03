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
	sass = require('gulp-sass'),
	rename = require("gulp-rename");


var dirLight = 'Plane';
var dirDark = 'Plane-dark';


function timeLog(m){
	var d = new Date();
	var n = d.toTimeString().split(' ')[0];

	console.log(`[${n}] Finished ${m}`);
}

gulp.task('sass', function () {

	return gulp.src("./src/gtk-3.0/**/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(rename(function (path) {

			// Send dark files to dark directory
			if(path.basename.indexOf('-dark') > -1 ){				
				path.basename = path.basename.replace('-dark','');
				path.dirname = `../../${dirDark}/gtk-3.0`;
			}

		}))
		.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0`)); 

});


// gulp.task('assets', function(){
// 	return 	gulp.src("./src/gtk-3.0/assets/*")
// 		.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0/assets`))
// 		.pipe(gulp.dest(`./build/${dirDark}/gtk-3.0/assets`));
// })

function autoreload(){

	var theme = dirLight;

	if (process.argv[process.argv.length - 1]) {

		let argv = process.argv[process.argv.length - 1];
		
		if (argv == '-D') theme = dirDark;

		// gsettings set  org.gnome.desktop.interface gtk-theme Adwaita
		// gsettings set  org.gnome.desktop.interface gtk-theme Plane
		exec(`gsettings set  org.gnome.desktop.interface gtk-theme Adwaita`, () => {
			
			exec(`gsettings set  org.gnome.desktop.interface gtk-theme ${theme}`, () => {
				
				timeLog(`Reload ${theme} theme`);
				
			})			
		})

	}
}


gulp.task('watch', function () {
  
  gulp.watch('./src/gtk-3.0/**/*.scss', function(cb){


  	/*
  	 *	GTK3 and Autoreload
  	 */
	gulp.src("./src/gtk-3.0/**/*.scss")
			.pipe(sass().on('error', sass.logError))
			.pipe(rename(function (path) {

				// Send dark files to dark directory
				if(path.basename.indexOf('-dark') > -1 ){				
					path.basename = path.basename.replace('-dark','');
					path.dirname = `../../${dirDark}/gtk-3.0`;
				}

			}))
			.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0`))
			.on('end',(cb)=>{
				autoreload();
			}); 

  });  

  gulp.watch('./src/gtk-3.0/assets/*', function(file){

	gulp.src(file.path)
		.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0/assets`))
		.pipe(gulp.dest(`./build/${dirDark}/gtk-3.0/assets`))
		.on('end', (cb) => {

			timeLog(`gtk-3.0 Assets`);

		})

  });


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
