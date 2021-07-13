<p align="center">
<img src="assets/logo.svg" />
</p>


# PLANE THEME

- 	A beautiful theme for Gnome Linux, more information in [Plane project](https://github.com/wfpaisa/plane)

<p align="center">
<img src="assets/screenshots/Screenshot_01.png" />
<br>
<img src="assets/screenshots/Screenshot_02.png" />
<br>
<img src="assets/screenshots/Screenshot_03.png" />
<br>
<img src="assets/screenshots/Screenshot_04.png" />
<br>
<img src="assets/screenshots/Screenshot_05.png" />
<br>
<img src="assets/screenshots/Screenshot_06.png" />
<br>
<img src="assets/screenshots/Screenshot_07.png" />
<br>
<img src="assets/screenshots/Screenshot_08.png" />
<br>
<img src="assets/screenshots/Screenshot_09.png" />
</p>

## Build

NODE: v8.12.0

NPM:  v6.4.1

```bash 

# Install node modules
$ npm i

# Build
$ gulp

# Create local .themes directory if it does not already exist
$ mkdir -p ~/.themes

# Copy white variant
$ cp -r ./build/Plane ~/.themes

# Copy dark variant
$ cp -r ./build/Plane-dark ~/.themes

# Active white theme
$ gsettings set  org.gnome.desktop.interface gtk-theme Plane && gsettings set org.gnome.shell.extensions.user-theme name Plane

# Active dark theme
$ gsettings set  org.gnome.desktop.interface gtk-theme Plane-dark && gsettings set org.gnome.shell.extensions.user-theme name Plane-dark

```


## Build with Autoreload

```bash 

# Build and make symbolic link to themes
$ npm i
$ gulp
$ mkdir -p ~/.themes
$ ln -s $(pwd)/build/Plane ~/.themes
$ ln -s $(pwd)/build/Plane-dark ~/.themes

# Autoreload Plane
$ gulp watch

# Autoreload Plane-dark
$ gulp watch -D

```

## GDM Theme
You can change the GDM (lock/login screen) theme by replacing the default GNOME Shell theme.
See the wiki for details: https://github.com/wfpaisa/plane-theme/wiki/GDM-Theme
<p align="center">
<img src="assets/screenshots/Screenshot_10.png" />
</p>

## Versions

- Gtk3: 3.24.30
- Gtk4: 4.2.1
- Gnome-shell: 40.3


## Thanks to

- Adwaita Theme

And all those designs that served as inspiration

## Licence
License: GPLv3
