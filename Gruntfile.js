module.exports = function (grunt) {
 
    grunt.initConfig({
        less: {
            compile: {
                files: {
                    'app/assets/style/css/bootstrap.css': 'app/assets/style/less/bootstrap/bootstrap.less',
                    'app/assets/style/css/app.css': 'app/assets/style/less/app/app.less'
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/assets/style/less/bootstrap/*.less', 'app/assets/style/less/app/*.less'],
                tasks: ['less']
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.registerTask('default', ['less', 'watch']);
 
};