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
				if (fs.statSync(__dirname + '/www/' + dir[i] + '/' + subdir[j]).isDirectory()) {
					html += htmlLineImg + '</tr>';
					html += htmlLineName + '</tr>';
					htmlLineImg  = '<tr>';
					htmlLineName = '<tr>';
					var subsubdir = fs.readdirSync(__dirname + '/www/' + dir[i] + '/' + subdir[j]);
					html   += '<tr style="height:15px;background:lightblue"><td colspan="' + inLine + '" style="height:15px;font-size:24px;text-align:center">' + subdir[j].substring(0, 1).toUpperCase() + subdir[j].substring(1) + '</td></tr>';
					readme += '### ' + dir[i] + '/' + subdir[j] + '\n===========================\n';
					var _cur = 0;
					for (var k = 0; k < subsubdir.length; k++) {
						if (_cur && !(_cur % inLine)) {
							html += htmlLineImg  + '</tr>';
							html += htmlLineName + '</tr>';
							htmlLineImg  = '<tr>';
							htmlLineName = '<tr>';
							_cur = 0;
						}
						readme += '![' + subsubdir[k] + '](www/' + dir[i] + '/' + subdir[j] + '/' + subsubdir[k] + ')\n';

						htmlLineImg  += '<td style="text-align: center"><img src="' + dir[i] + '/' + subdir[j] + '/' + subsubdir[k] + '" width="64" height="64"></td>\n';
						if (subsubdir[k].length > 30) {
							htmlLineName += '<td style="text-align: center" title="' + subsubdir[k] + '">' + subsubdir[k].substring(0, 30) + '...</td>\n';
						} else {
							htmlLineName += '<td style="text-align: center">' + subsubdir[k] + '</td>\n';
						}
						_cur++;
					}
					html += htmlLineImg + '</tr>';
					html += htmlLineName + '</tr>';
					htmlLineImg  = '<tr>';
					htmlLineName = '<tr>';
					continue;
				}
			
				
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