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

/* Dependencies */
var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	del = require('del'),
	exec = require('child_process').exec,
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	rename = require("gulp-rename");


/* Global variables */
var dirLight = 'Plane';
var dirDark = 'Plane-dark';


/*========================================
=            Global functions            =
========================================*/



/**
 * Time Log + Message
 *
 * @param      {string}  m       message
 */
function timeLog(m){
	var d = new Date();
	var n = d.toTimeString().split(' ')[0];

	console.log(`[${n}] ${m}`);
}


/**
 * GTK Auto reload
 */
function autoreload(){

	var theme = dirLight;

	/* Active dark theme */
	if (process.argv[process.argv.length - 1]) {

		let argv = process.argv[process.argv.length - 1];
		
		if (argv == '-D') theme = dirDark;


		/* First change default theme and late change to our theme */
		exec(`gsettings set  org.gnome.desktop.interface gtk-theme Adwaita`, () => {
			
			exec(`gsettings set  org.gnome.desktop.interface gtk-theme ${theme}`, () => {
				
				timeLog(`Reload ${theme} theme`);

				return;
				
			})			
		})

	}
}


/**
 * Sass 
 * Generate css files
 *
 * @param      {string}    dir     The directory
 * @param      {Function}  cb      callback
 */
function reSass(dir,cb){
  	 
	gulp.src(`./src/${dir}/**/*.scss`)
			.pipe(sass().on('error', sass.logError))
			.pipe(rename(function (path) {

				// Send dark files to dark directory
				if(path.basename.indexOf('-dark') > -1 ){				
					path.basename = path.basename.replace('-dark','');
					path.dirname = `../../${dirDark}/${dir}`;
				}

			}))
			.pipe(gulp.dest(`./build/${dirLight}/${dir}`))
			.on('end',()=>{
				cb();
			}); 

}

/*=====  End of Global functions  ======*/



/*====================================
=            Common tasks            =
====================================*/

/*----------  gtk-3.0  ----------*/

gulp.task('gtk3-sass', function (cb) {

	reSass('gtk-3.0', function(){
		cb();
	}); 

});


gulp.task('gtk3-assets', function(){
	return 	gulp.src("./src/gtk-3.0/assets/*")
		.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0/assets`))
		.pipe(gulp.dest(`./build/${dirDark}/gtk-3.0/assets`));
})


/*----------  gtk-2.0  ----------*/

gulp.task('gtk2-light', function(){
	return 	gulp.src([
						"./src/gtk-2.0/*",
						"./src/gtk-2.0/*/*",
						"!./src/gtk-2.0/*-dark",
						"!./src/gtk-2.0/*-dark/*",
					])
				.pipe(gulp.dest(`./build/${dirLight}/gtk-2.0/`));
		

})

gulp.task('gtk2-dark', function(){
	return 	gulp.src([
						"./src/gtk-2.0/*",
						"./src/gtk-2.0/*/*",
						"!./src/gtk-2.0/assets/*",
					])
			.pipe(rename(function (path) {

				// Send dark files to dark directory
				if(path.basename.indexOf('-dark') > -1 || path.dirname.indexOf('-dark') > -1 ){
					path.basename = path.basename.replace('-dark','');
					path.dirname = path.dirname.replace('-dark','');
				}

			}))
			.pipe(gulp.dest(`./build/${dirDark}/gtk-2.0/`));
})


gulp.task('theme-light', function(){
	return gulp.src('./src/index.theme')
			.pipe(gulp.dest(`./build/${dirLight}`))
})
gulp.task('theme-dark', function(){
	return gulp.src('./src/index-dark.theme')
			.pipe(gulp.dest(`./build/${dirDark}/index.theme`))
})
/*=====  End of Common tasks  ======*/




/*=============================
=            Watch            =
=============================*/

gulp.task('watch', function () {
  
  // gulp.watch('./src/gtk-3.0/**/*.scss',  ['gtk3-sass'], function(cb){
  // 		autoreload();
  // 		cb()
  // });  
  gulp.watch('./src/gtk-3.0/**/*.scss',  function(cb){
  		
  		gulp.start('gtk3-sass', function(){
  			autoreload();	
  		})
  		
  });  
  	


  /* Images */
  
  gulp.watch('./src/gtk-3.0/assets/*', function(file){

	gulp.src(file.path)
		.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0/assets`))
		.pipe(gulp.dest(`./build/${dirDark}/gtk-3.0/assets`))
		.on('end', (cb) => {

			timeLog(`gtk-3.0 Assets`);

		})

  });


}); 

/*=====  End of Watch  ======*/




/**
 *
 * Generate Plane and Plane-dark theme
 *
 */

gulp.task('default', ['theme-light','theme-dark','gtk3-sass', 'gtk3-assets', 'gtk2-light', 'gtk2-dark'], (cb) => {

});
