module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %>' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'barrita.js', 'test/spec/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      }
    },
    // spec pass in browser but fails in phantomjs
    // $ grunt jasmin --debug
    // https://github.com/ekonijn/grunt-require-demo/blob/master/doc/debugging-jasmine.md
    jasmine : {
      src: 'barrita.js',
      options: {
        specs: 'test/spec/*.js',
        vendor: 'vendor/jquery-1.10.2.min.js',
        styles: 'barrita.css',
        //'--remote-debugger-port': 9000
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('test', ['jshint', 'jasmine']);

};
