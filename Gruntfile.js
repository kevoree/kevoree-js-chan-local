module.exports = function (grunt) {

  grunt.initConfig({
    // retrieve your project package.json
    pkg: grunt.file.readJSON('package.json'),

    // creates kevlib.json which represents your project Kevoree model
    // by parsing your pkg.main entry point
    kevoree_genmodel: {
      main: {}
    },

    kevoree_registry: {
      main: {
        src: 'kevlib.json'
      }
    },

    kevoree: {
      main: {
        options: {
          runtime: 'next'
        }
      }
    },

    browserify: {
      browser: {
        options: {
          external: ['kevoree-library'],
          alias: ['<%= pkg.main %>:<%= pkg.name %>']
        },
        src: [],
        dest: 'browser/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        mangle: {
          except: ['_super']
        }
      },
      browser: {
        src: '<%= browserify.browser.dest %>',
        dest: 'browser/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-kevoree');
  grunt.loadNpmTasks('grunt-kevoree-genmodel');
  grunt.loadNpmTasks('grunt-kevoree-registry');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['kevoree_genmodel', 'browser']);
  grunt.registerTask('publish', ['kevoree_registry']);
  grunt.registerTask('kev', ['kevoree']);
  grunt.registerTask('browser', ['browserify', 'uglify']);
};
