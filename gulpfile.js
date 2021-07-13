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

const version = '4.0';

/* Dependencies */
var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	del = require('del'),
	exec = require('child_process').exec,
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	rename = require("gulp-rename"),
	os = require('os'),
	zip = require("gulp-zip");



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
function timeLog(m) {
	var d = new Date();
	var n = d.toTimeString().split(' ')[0];

	console.log(`[${n}] ${m}`);
}


/**
 * GTK Auto reload
 */
function autoreload() {

	var theme = dirLight;

	/* Active dark theme */
	if (process.argv[process.argv.length - 1]) {

		let argv = process.argv[process.argv.length - 1];

		if (argv == '-D') theme = dirDark;


		/* First change default theme and late change to our theme */
		exec(`gsettings set  org.gnome.desktop.interface gtk-theme Adwaita && gsettings set org.gnome.shell.extensions.user-theme name "Deault"`, () => {

			setTimeout(function () {
				exec(`gsettings set  org.gnome.desktop.interface gtk-theme ${theme} && gsettings set org.gnome.shell.extensions.user-theme name ${theme}`, () => {

					timeLog(`Reload ${theme} theme`);
					return;

				})

			}, 500);
		})

	}
}


/**
 *
 * Copy all files in user folder
 *
 */

gulp.task('copy-user-theme-folder', function () {
	return gulp.src('./build/**/*')
		.pipe(gulp.dest(os.homedir() + '/.local/share/themes/'))
})

/*=====  End of Global functions  ======*/



/*====================================
=            Common tasks            =
====================================*/

/*----------  Gnome-shell  ----------*/

gulp.task('gnome-shell-light', function (cb) {
	return gulp.src(`./src/gnome-shell/gnome-shell.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(`./build/${dirLight}/gnome-shell/`))
});

gulp.task('gnome-shell-light-assets', function () {
	return gulp.src([
		"./src/gnome-shell/common-assets/*.*",
		"./src/gnome-shell/light-assets/*.*",
	])
		.pipe(gulp.dest(`./build/${dirLight}/gnome-shell/`));
})

gulp.task('gnome-shell-dark', function (cb) {
	return gulp.src(`./src/gnome-shell/gnome-shell-dark.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('gnome-shell.css'))
		.pipe(gulp.dest(`./build/${dirDark}/gnome-shell/`))
});

gulp.task('gnome-shell-dark-assets', function () {
	return gulp.src([
		"./src/gnome-shell/common-assets/*.*",
		"./src/gnome-shell/dark-assets/*.*",
	])
		.pipe(gulp.dest(`./build/${dirDark}/gnome-shell/`));
})

gulp.task('gnome-shell-high', function (cb) {
	return gulp.src(`./src/gnome-shell/gnome-shell-high-contrast.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(`./build/${dirDark}/gnome-shell/`))
		.pipe(gulp.dest(`./build/${dirLight}/gnome-shell/`))
});

/*----------  gtk-4.0  ----------*/

gulp.task('gtk4-light', function (cb) {
	return gulp.src(`./src/gtk-4.0/**/*.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(`./build/${dirLight}/gtk-4.0`))
});

gulp.task('gtk4-dark', function (cb) {
	return gulp.src(`./src/gtk-4.0/gtk-contained-dark.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('gtk.css'))
		.pipe(gulp.dest(`./build/${dirDark}/gtk-4.0/`));
});

gulp.task('gtk4-assets', function () {
	return gulp.src("./src/gtk-4.0/assets/*")
		.pipe(gulp.dest(`./build/${dirLight}/gtk-4.0/assets`))
		.pipe(gulp.dest(`./build/${dirDark}/gtk-4.0/assets`));
})

/*----------  gtk-3.0  ----------*/

gulp.task('gtk3-light', function (cb) {
	return gulp.src(`./src/gtk-3.0/**/*.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0`))
});

gulp.task('gtk3-dark', function (cb) {
	return gulp.src(`./src/gtk-3.0/gtk-contained-dark.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('gtk.css'))
		.pipe(gulp.dest(`./build/${dirDark}/gtk-3.0/`));
});

gulp.task('gtk3-assets', function () {
	return gulp.src("./src/gtk-3.0/assets/*")
		.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0/assets`))
		.pipe(gulp.dest(`./build/${dirDark}/gtk-3.0/assets`));
})


/*----------  gtk-2.0  ----------*/
// Light
gulp.task('gtk2-light', ['gtk2-light-assets', 'gtk2-light-menubar', 'gtk2-light-files']);

gulp.task('gtk2-light-assets', function (cb) {
	return gulp.src('./src/gtk-2.0/assets/*')
		.pipe(gulp.dest(`./build/${dirLight}/gtk-2.0/assets`))
});
gulp.task('gtk2-light-menubar', function (cb) {
	return gulp.src([
		"./src/gtk-2.0/menubar-toolbar/*",
		"!./src/gtk-2.0/menubar-toolbar/menubar-toolbar-dark.rc",
	])
		.pipe(gulp.dest(`./build/${dirLight}/gtk-2.0/menubar-toolbar`))
});

gulp.task('gtk2-light-files', function () {
	return gulp.src([
		"./src/gtk-2.0/apps.rc",
		"./src/gtk-2.0/gtkrc",
		"./src/gtk-2.0/main.rc",
		"./src/gtk-2.0/panel.rc",
		"./src/gtk-2.0/xfce-notify.rc",
	])
		.pipe(gulp.dest(`./build/${dirLight}/gtk-2.0`));
})

// Dark
gulp.task('gtk2-dark', ['gtk2-dark-assets', 'gtk2-dark-menubar', 'gtk2-dark-files', 'gtk2-gtkrc-dark']);

gulp.task('gtk2-dark-assets', function (cb) {
	return gulp.src('./src/gtk-2.0/assets-dark/*')
		.pipe(gulp.dest(`./build/${dirDark}/gtk-2.0/assets`))
});
gulp.task('gtk2-dark-menubar', function (cb) {
	return gulp.src([
		"./src/gtk-2.0/menubar-toolbar/*",
		"!./src/gtk-2.0/menubar-toolbar/menubar-toolbar.rc",
	])
		.pipe(gulp.dest(`./build/${dirDark}/gtk-2.0/menubar-toolbar`))
});

gulp.task('gtk2-dark-files', function () {
	return gulp.src([
		"./src/gtk-2.0/apps.rc",
		"./src/gtk-2.0/main.rc",
		"./src/gtk-2.0/panel.rc",
		"./src/gtk-2.0/xfce-notify.rc",
	])
		.pipe(gulp.dest(`./build/${dirDark}/gtk-2.0`));
})

gulp.task('gtk2-gtkrc-dark', function (cb) {
	return gulp.src('./src/gtk-2.0/gtkrc-dark')
		.pipe(rename('gtkrc'))
		.pipe(gulp.dest(`./build/${dirDark}/gtk-2.0`))
});

// gulp.task('gtk2-light', function(){
// 	return 	gulp.src([
// 						"./src/gtk-2.0/*",
// 						"./src/gtk-2.0/*/*",
// 						"!./src/gtk-2.0/*-dark",
// 						"!./src/gtk-2.0/*-dark/*",
// 					])
// 				.pipe(gulp.dest(`./build/${dirLight}/gtk-2.0/`));


// })

// gulp.task('gtk2-dark', function(){
// 	return 	gulp.src([
// 						"./src/gtk-2.0/*",
// 						"./src/gtk-2.0/*/*",
// 						"!./src/gtk-2.0/assets/*",
// 					])
// 			.pipe(rename(function (path) {

// 				// Send dark files to dark directory
// 				if(path.basename.indexOf('-dark') > -1 || path.dirname.indexOf('-dark') > -1 ){
// 					path.basename = path.basename.replace('-dark','');
// 					path.dirname = path.dirname.replace('-dark','');
// 				}

// 			}))
// 			.pipe(gulp.dest(`./build/${dirDark}/gtk-2.0/`));
// })


/*----------  Theme File  ----------*/

gulp.task('theme-light', function () {
	return gulp.src('./src/index.theme')
		.pipe(gulp.dest(`./build/${dirLight}`))
})
gulp.task('theme-dark', function () {
	return gulp.src('./src/index-dark.theme')
		.pipe(rename('index.theme'))
		.pipe(gulp.dest(`./build/${dirDark}`))
})


/*----------  xfwm4  ----------*/

gulp.task('xfwm4-light', function (cb) {
	return gulp.src([
		'./src/xfwm4/assets/*.png',
		'./src/xfwm4/themerc'
	])
		.pipe(gulp.dest(`./build/${dirLight}/xfwm4`))
});


gulp.task('xfwm4-dark', ['xfwm4-dark-assets', 'xfwm4-dark-themerc']);

gulp.task('xfwm4-dark-assets', function (cb) {
	return gulp.src('./src/xfwm4/assets-dark/*.png')
		.pipe(gulp.dest(`./build/${dirDark}/xfwm4`))
});

gulp.task('xfwm4-dark-themerc', function (cb) {
	return gulp.src('./src/xfwm4/themerc-dark')
		.pipe(rename('themerc'))
		.pipe(gulp.dest(`./build/${dirDark}/xfwm4`))
});



/*=====  End of Common tasks  ======*/




/*=============================
=            Watch            =
=============================*/

gulp.task('watch', function () {

	// Gtk4
	gulp.watch('./src/gtk-4.0/**/*.scss', function (cb) {

		gulp.start(['gtk4-light', 'gtk4-dark'], function () {

			gulp.start('copy-user-theme-folder', function () {
				autoreload();
			})
		})

	});

	gulp.watch('./src/gtk-4.0/assets/*', function (file) {

		gulp.src(file.path)
			.pipe(gulp.dest(`./build/${dirLight}/gtk-4.0/assets`))
			.pipe(gulp.dest(`./build/${dirDark}/gtk-4.0/assets`))
			.on('end', (cb) => {

				timeLog(`gtk-4.0 Assets`);

			})

	});


	// Gtk3
	gulp.watch('./src/gtk-3.0/**/*.scss', function (cb) {

		gulp.start(['gtk3-light', 'gtk3-dark'], function () {

			gulp.start('copy-user-theme-folder', function () {
				autoreload();
			})
		})

	});

	gulp.watch('./src/gtk-3.0/assets/*', function (file) {

		gulp.src(file.path)
			.pipe(gulp.dest(`./build/${dirLight}/gtk-3.0/assets`))
			.pipe(gulp.dest(`./build/${dirDark}/gtk-3.0/assets`))
			.on('end', (cb) => {

				timeLog(`gtk-3.0 Assets`);

			})

	});

	// Gnome-shell
	gulp.watch('./src/gnome-shell/**/*.scss', function (cb) {

		gulp.start([
			'gnome-shell-light',
			'gnome-shell-light-assets',
			'gnome-shell-dark',
			'gnome-shell-dark-assets',
			'gnome-shell-high'
		], function () {
			gulp.start('copy-user-theme-folder', function () {
				autoreload();
			})
		})

	});


});

/*=====  End of Watch  ======*/

gulp.task('zip-light', function () {
	return gulp.src(`./build/${dirLight}/**/*`)
		.pipe(zip(`${dirLight}-${version}.zip`))
		.pipe(gulp.dest('./build/'))
})

gulp.task('zip-dark', function () {
	return gulp.src(`./build/${dirDark}/**/*`)
		.pipe(zip(`${dirDark}-${version}.zip`))
		.pipe(gulp.dest('./build/'))
})



/**
 *
 * Generate Plane and Plane-dark theme
 *
 */

gulp.task('default', [
	'theme-light',
	'theme-dark',
	'gtk4-light',
	'gtk4-dark',
	'gtk4-assets',
	'gtk3-light',
	'gtk3-dark',
	'gtk3-assets',
	'gtk2-light',
	'gtk2-dark',
	'gnome-shell-light',
	'gnome-shell-light-assets',
	'gnome-shell-dark',
	'gnome-shell-dark-assets',
	'gnome-shell-high',
	'xfwm4-light',
	'xfwm4-dark'
], (cb) => {

	gulp.start(['zip-light', 'zip-dark'], function () {
		cb;
	})

});
