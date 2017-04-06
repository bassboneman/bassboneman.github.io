'use strict';

module.exports = function (grunt) {

  // Show elapsed time after tasks run to visualize performance
  require('time-grunt')(grunt);
  // Load all Grunt tasks that are listed in package.json automagically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // shell commands for use in Grunt tasks
    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'jekyll serve'
      }
    },

    // watch for files to change and run tasks when they do
    watch: {
      sass: {
        files: ['site/web_assets/**/*.{scss,sass}'],
        tasks: ['sass']
      },

      scripts: {
        files: ['site/web_assets/js/src/libs/*.js', 'site/web_assets/js/src/partials/*.js'],
        // tasks: ['concat', 'uglify'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      } 
    },

    concat: {   
      dist: {
      src: [
        'site/web_assets/js/src/libs/*.js',
        'site/web_assets/js/src/partials/*.js'
      ],
      dest: 'site/web_assets/js/dist/scripts.js',
      }
    },

    // uglify: {
    //   build: {
    //   src: 'assets/js/src/scripts.js',
    //   dest: 'assets/js/dist/scripts.min.js'
    //   }
    // },

    // sass (libsass) config
    sass: {
      options: {
        sourceMap: true,
        relativeAssets: false,
        outputStyle: 'compressed',
        sassDir: 'site/web_assets/scss',
        cssDir: ''
      },
      build: {
        files: [{
          expand: true,
          cwd: 'site/web_assets/scss/',
          src: ['**/*.{scss,sass}'],
          dest: 'site/web_assets/css/',
          ext: '.css'
        }]
      }
    },

    // run tasks in parallel
    concurrent: {
      serve: [
        'sass',
        'concat',
        // 'uglify',
        'watch',
        'shell:jekyllServe'
      ],
      options: {
        logConcurrentOutput: true
      }
    },

  });

  // Register the grunt serve task
  grunt.registerTask('serve', [
    'concurrent:serve'
  ]);

  // Register the grunt build task
  grunt.registerTask('build', [
    'shell:jekyllBuild',
    'sass',
    'concat'
    // 'uglify'
  ]);

  // Register build as the default task fallback
  grunt.registerTask('default', 'build');

};