// To use this file in WebStorm, right click on the file name in the Project Panel (normally left) and select "Open Grunt Console"

/** @namespace __dirname */
/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

module.exports = function (grunt) {
   // Project configuration.

    grunt.initConfig({

    });

    grunt.registerTask('updateList', function () {
        var fs = require('fs');
        var dir = fs.readdirSync(__dirname + '/www');
        var readme = '';
        var html = '<html><body style="background: lightgray"><table>';
        var inLine = 6;
        for (var i = 0; i < dir.length; i++) {
            if (dir[i] == 'index.html') continue;
            var subdir = fs.readdirSync(__dirname + '/www/' + dir[i]);
            var htmlLineImg  = '<tr>';
            var htmlLineName = '<tr>';
            html   += '<tr style="height:15px;background:lightblue"><td colspan="' + inLine + '" style="height:15px;font-size:24px;text-align:center">' + dir[i].substring(0, 1).toUpperCase() + dir[i].substring(1) + '</td></tr>';
            readme += '### ' + dir[i] + '\n===========================\n';

            var cur = 0;
            for (var j = 0; j < subdir.length; j++) {
                if (cur && !(cur % inLine)) {
                    html += htmlLineImg  + '</tr>';
                    html += htmlLineName + '</tr>';
                    htmlLineImg  = '<tr>';
                    htmlLineName = '<tr>';
                    cur = 0;
                }
                readme += '![' + subdir[i] + '](www/' + dir[i] + '/' + subdir[j] + ')\n';

                htmlLineImg  += '<td style="text-align: center"><img src="' + dir[i] + '/' + subdir[j] + '" width="64" height="64"></td>\n';
                if (subdir[j].length > 30) {
                    htmlLineName += '<td style="text-align: center" title="' + subdir[j] + '">' + subdir[j].substring(0, 30) + '...</td>\n';
                } else {
                    htmlLineName += '<td style="text-align: center">' + subdir[j] + '</td>\n';
                }
                cur++;
            }
            html += htmlLineImg + '</tr>';
            html += htmlLineName + '</tr>';
        }
        html += '</table></body></html>';
        grunt.file.write('ICONLIST.md', readme);
        grunt.file.write('www/index.html', html);
    });


    grunt.registerTask('default', [
        'updateList'
    ]);
};