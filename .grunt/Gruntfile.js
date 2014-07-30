module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['../packages/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			}
		},
		sass: {
			dist: {
				src: '../packages/app-main/main.scss',
				dest: '../packages/app-main/main.css',
				options: {
					includePaths: ['../packages/'],
					outputStyle: 'expanded',
					sourceComments: 'none'
				}
			}
		}
	});
	grunt.registerTask('default', ['sass:dist', 'watch']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
