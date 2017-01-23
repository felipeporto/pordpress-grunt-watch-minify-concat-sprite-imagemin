module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		dirs: {
			generated_root		: '..',
			generated_css		: '../css',
			generated_js		: '../js',
			generated_images	: '../images',
			generated_fonts		: '../fonts',
			src_css				: 'css',
			src_js				: 'js',
			src_images			: 'images',
			src_fonts			: 'fonts',
		},

		clean: {
			task: [
				'<%= dirs.generated_images %>/**/*',
				'<%= dirs.generated_css %>/**/*',
				'<%= dirs.generated_js %>/**/*',
				'<%= dirs.generated_fonts %>/**/*'
			],
			stylecss: ['<%= dirs.generated_css %>/style.css']
		},

		copy: {
			task: {
				files: [
					{
						expand: true, 
						cwd: '<%= dirs.src_fonts %>',
						src: ['**/*'],
						dest: '<%= dirs.generated_fonts %>'
					},
					{
						expand: true, 
						cwd: '<%= dirs.src_js %>',
						src: ['**/*'],
						dest: '<%= dirs.generated_js %>'
					}
				],
			},
			stylecss: {
				src: '<%= dirs.generated_css %>/style.css',
				dest: '<%= dirs.generated_root %>/style.css'
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			vendors_js: {
				src: [ '<%= dirs.src_js %>/vendors/*.js' ],
				dest: '<%= dirs.generated_js %>/vendors.min.js',
			}
		},

		imagemin: {
			task: {
				files: [{
					expand: true, 
					cwd: '<%= dirs.src_images %>/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= dirs.generated_images %>/'
				}]
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: '<%= dirs.src_css %>',
					cssDir: '<%= dirs.generated_css %>',
					imagesDir: '<%= dirs.src_images %>',
					generatedImagesDir: '<%= dirs.generated_images %>',
					httpGeneratedImagesPath: '<%= dirs.src_images %>',
					environment: 'production',
					outputStyle: 'compressed',
					force: true
				}
			},
			dev: {
				options: {
					sassDir: '<%= dirs.src_css %>',
					cssDir: '<%= dirs.generated_css %>',
					imagesDir: '<%= dirs.src_images %>',
					generatedImagesDir: '<%= dirs.generated_images %>',
					httpGeneratedImagesPath: '<%= dirs.src_images %>',
					force: true
				}
			}
		},

		uglify: {
			task: {
				expand: true,
				cwd: '<%= dirs.generated_js %>',
				src: ['**/*.js'],
				dest: '<%= dirs.generated_js %>',
			}
		},

		notify: {
			watch: {
				options: {
					title: 'Task Complete: watch',
					message: 'Arquivos prontos!',
				}
			},
			dist: {
				options: {
					title: 'Task Complete: dist',
					message: 'Arquivos de distribuição prontos!',
				}
			}
		},

		watch: {
			js: {
				files: ['<%= dirs.src_js %>/**/*'],
				tasks: ['copy:task', 'concat:vendors_js', 'notify:watch'],
			},
			css: {
				files: ['<%= dirs.src_css %>/**/*'],
				tasks: ['compass:dev', 'copy:stylecss', 'clean:stylecss', 'notify:watch'],
			},
			images: {
				files: ['<%= dirs.src_images %>/**/*'],
				tasks: ['imagemin', 'notify:watch'],
			},
		},
	});
	
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.task.run('notify_hooks');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('deploy', ['clean:task', 'copy:task', 'imagemin', 'compass:dist', 'concat:vendors_js', 'uglify', 'copy:stylecss', 'clean:stylecss', 'notify:dist']);
};