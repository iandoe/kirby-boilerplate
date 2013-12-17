module.exports = function(grunt) {

  grunt.initConfig({

    // PKG
    pkg: grunt.file.readJSON('package.json'),

    // Config
    config: {
      local_url: "http://localhost",
      live_url: "http://website.fr"
    },

    // Directories
    dir: {
      js: "assets/js",
      js_vendor: "assets/js/vendor/",
      js_plugins: ["assets/js/vendor/*.js", "!assets/js/vendor/jquery-*.js"],
      jquery_validate: "assets/js/vendor/validate",
      sass: "assets/sass/*.scss",
      css: "assets/css",
      img: "assets/img",
      img_src: "assets/img/src",
      img_files: "assets/img/src/**/*.{png,jpg,gif}"
    },

    // Big brother is Watching
    watch: {
        js: {
          files: "<%= dir.js %>/main.js",
          tasks: ["uglify:main"]
        },
        js_plugins: {
         files: "<%= dir.js_plugins %>",
         tasks: ["concat:prod", "uglify:plugins"]
        },
        validate: {
          files: "<%= dir.jquery_validate %>/*",
          tasks: ["concat:validate"]
        },
        css: {
          files: "<%= dir.css %>",
          tasks: ["copy"]
        },
        sass: {
          files: "<%= dir.sass %>",
          tasks: ["copy"]
        },
        images: {
          files: "<%= dir.img_files %>",
          tasks: ["imagemin"]
        }
      },

    // Browser Sync
    browser_sync: {
      files: {
        src: "<%= dir.css %>/main.min.css"
      },
      options: {
        watchTask: true,
      },
    },

    // Compass
    compass: {
      options: {
        config: "config.rb"
      },
      dev: {
        options: {
          outputStyle: "expanded",
          environment: "development"
        }
      },
      prod: {
        options: {
          outputStyle: "compressed",
          environment: "production"
        }
      }
    },

    // Move main.css to main.min.css
    copy: {
      main: {
        src: "<%= dir.css %>/main.css",
        dest: "<%= dir.css %>/main.min.css"
      }
    },

    // JS Concat
    concat: {
      options: {
        separator: ';'
      },
      prod: {
        src: ['<%= dir.js_plugins %>'],
        dest: 'assets/js/plugins.min.js'
      },
      validate : {
        src: ['<%= dir.jquery_validate %>/validate.min.js', '<%= dir.jquery_validate %>/validate-locale-fr.js'],
        dest: 'assets/js/vendor/validate.js'
      }
    },

    // JS Uglify
    uglify: {
      options: {
        banner: '/*!\n\n Project: <%= pkg.name %> \n Last Updated: <%= grunt.template.today("dd-mm-yyyy") %> \n Copyright (c) <%= grunt.template.today("yyyy") %>, <%= pkg.author %> \n\n */\n\n'
      },
      main: {
        options: { mangle: false },
        files: {
          '<%= dir.js %>/main.min.js': ['<%= dir.js %>/main.js']
        }
      },
      plugins: {
        files: {
          '<%= dir.js %>/plugins.min.js': ['<%= concat.prod.dest %>'],
        }
      }
    },

    // Image Optimization
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,
          cwd: '<%= dir.img_src %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= dir.img %>'
      }]
      }
    },

    // Google Pagespeed
    pagespeed: {
      prod: {
        url: "<%= config.live_url %>",
        locale: "en_GB",
        strategy: "desktop",
        threshold: 80
      },
      options: {
        key: "AIzaSyAKehsIi8yX4OmNFkUOuMWEyJ5HrfnZU2k"
      }
    }

  });

  grunt.registerTask('default', ['browser_sync', "watch"]);
  grunt.registerTask('pack', ["concat", "uglify", "compass:prod","copy", "imagemin"]);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};