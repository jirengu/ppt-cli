var mdfile2Html = require('./md2html.js');
var ejs = require('ejs');
var fs = require('fs');
var ncp = require('ncp').ncp;



function ppt(commonds, argv) {
	console.log('ppt');
	console.log(commonds)
	if (commonds.length === 0) {
		console.log('配置文件功能待开发，敬请期待...');
		return;
	}
	if (commonds.length === 1 && /\.md$/.test(commonds[0])) {
		console.log('++', commonds[0])
		create(commonds[0]);
		return;
	}
	console.log('当前命令不支持...')
}


function create(fullPath) {
	console.log(fullPath)
	var filePath = fullPath.replace(/\.md$/, '');
	var fileName = filePath.match('\/?([^/]+$)')[1];

	mdfile2Html(fullPath, (html) => {
		var data = {
			title: fileName,
			html: html
		};

		ejs.renderFile('../template/index.ejs', data, (err, str) => {
			if (err) throw err;
			let dir = process.cwd() + '/www/';
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			fs.writeFile(dir + fileName + '.html', str, (err) => {
				if (err) throw err;
				console.log('It\'s saved!');

				ncp('../template/static', dir, function(err) {
					if (err) {
						return console.error(err);
					}
					console.log('done!');
				});
			});

		});
	})

}

module.exports = ppt