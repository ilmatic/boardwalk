'use strict';

// Wrapper function -- do all grunt-related things here.
module.exports = function(grunt) {
	// Load all grunt tasks.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var taskConfig = {
		mochaTest: {
			dev: {
				options: {
					reporter: 'spec'
				},
				src: ['src/**/*.spec.js']
			}
		},
		watch: {
			dev: {
				files: [
					'src/**/*.js'
				],
				tasks: [
					'mochaTest:dev'
				]
			}
		}
	};

	grunt.initConfig(taskConfig);

};