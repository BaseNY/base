module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['../client/stylesheets/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			}
		},
		sass: {
			dist: {
				src: '../client/stylesheets/application.scss',
				dest: '../client/stylesheets/application.css',
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
