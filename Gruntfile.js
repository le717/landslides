module.exports = function(grunt) {
  "use strict";
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: '/* <%= pkg.name %> - v<%= pkg.version %>\n' +
    '<%= pkg.homepage ? "" + pkg.homepage + "\\n" : "" %>' +
    'Created <%= grunt.template.today("yyyy") %> <%= pkg.author %>; ' +
    'Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %>\n*/\n',
    cssfiles: ["css/*.css", "!css/*.min.css"],
    jsfiles: ["js/*.js", "!js/*min.js"],

    devUpdate: {
      main: {
        options: {
          // Do not mention already updated dependencies
          reportUpdated: false,
          // Prompt asking if the dependency should be updated
          updateType : "prompt"
        }
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: "node_modules/",
        src: "jquery.runner/build/*-min.js",
        dest: "js/",
        flatten: true,
        filter: "isFile"
      },
    },

    htmlhint: {
      html: {
        options: {
          "tag-pair": true,
        },
        src: ["index.html"]
      }
    },

    csslint: {
      strict: {
        options: {
          csslintrc: ".csslintrc",
          "import": 2
        },
        src: "<%= cssfiles %>",
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: "<%= banner %>"
        },
        files: {
          "css/style.min.css": "<%= cssfiles %>"
        }
      }
    },

    jshint: {
      src: {
        options: {
          jshintrc: ".jshintrc"
        },
        src: "<%= jsfiles %>",
      },
    },

    uglify: {
      options: {
        banner: "<%= banner %>"
      },
      my_target: {
        files: {
          "js/index.min.js": "<%= jsfiles %>",
        }
      }
    },

    watch: {
      files: ["Gruntfile.js", "<%= cssfiles %>", "<%= jsfiles %>"],
      tasks: ["all"]
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', 'List commands', function () {
    grunt.log.writeln("");
    grunt.log.writeln('Run "grunt lint" to lint the source files');
    grunt.log.writeln('Run "grunt build" to minify the source files');
    grunt.log.writeln('Run "grunt devUpdate" to update the devDependencies');
    grunt.log.writeln('Run "grunt all" to run all tasks except "devUpdate"');
  });

  grunt.registerTask("lint", ["htmlhint", "csslint", "jshint"]);
  grunt.registerTask("build", ["cssmin", "uglify"]);
  grunt.registerTask("all", ["lint", "build"]);
  grunt.option("force", true);
};
