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
                "Cache-Control": "max-age=60, public",
                "Content-Type": "application/javascript"
            },
            debug: false
        },
        dev: {
            upload: [{
                src: 'src/data.jsonp',
                dest: 'embed/2014/feb/100-years-of-war/data.jsonp'
            }]
        }
    },
  });

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['connect']);
  grunt.registerTask('pushdata', ['execute', 's3']);


};
