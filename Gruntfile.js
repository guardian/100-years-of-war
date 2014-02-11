var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'src',
          keepalive: true
        }
      }
    },
    execute: {
        target: { src: ['fetchData.js'] }
    },


    s3: {
        options: {
            bucket: 'gdn-cdn',
            access: 'public-read',
            headers: {
                "Cache-Control": "max-age=60, public"
            },
            debug: false
        },
        pushdata: {
            upload: [{
                  src: 'src/data.jsonp',
                  dest: 'embed/2014/feb/100-years-of-war/',
                  options: {
                      headers: {
                          "Content-Type": "application/javascript"
                      }
                  },
              }]
        },

        deploy: {
            upload: [
              {
                  src: 'src/**/*.*',
                  dest: 'embed/2014/feb/100-years-of-war/',
                  rel: 'src/'
              },
              {
                  src: 'src/data.jsonp',
                  dest: 'embed/2014/feb/100-years-of-war/',
                  options: {
                      headers: {
                          "Content-Type": "application/javascript"
                      }
                  },
              }
            ]
        }
    },
  });

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['connect']);
  grunt.registerTask('pushdata', ['execute', 's3:pushdata']);
  grunt.registerTask('deploy', ['execute', 's3:deploy', 's3:pushdata']);

};
