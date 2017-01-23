# WordPress Starter Theme with Grunt watch, minify, concat, sprite and imagemin

No code included, just grunt config for watch files and prepare for deploy.

### Features

  - Run tasks whenever watched files change
  - CSS concat
  - JS concat
  - Sprite generator
  - CSS minification
  - JS minification
  - Image minification

### Usage

Only change static files (css, js, images and fonts) inside static_source folder, theys will be processed and copied to the correct destinations.

**Watch**

```
grunt watch --force
```

Watch for files modification and run tasks for concat, generate sprites and copy files from static_source folder to theirs correct destination.

**Deploy**

```
grunt deploy --force
```

Prepare files for deploy. Run tasks for concat, generate sprites, minify and copy files.

**Image Sprite**

Put the imagens for the sprite inside the folder *static_source/images/icons* and user the code below inside the *style.scss* file.

```
@include icons-sprite('see-all-authors');
width: icons-sprite-width('see-all-authors'); // optional - image width
height: icons-sprite-height('see-all-authors'); // optional - image height
```

**JS concat (vendors files)**

Put js in the folder *static_source/js/vendors* and user the code below in yours *functions.php* file.

```
wp_register_script( 'theme-vendors', get_template_directory_uri() . '/js/vendors.min.js');
```