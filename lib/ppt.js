var mdfile2Html = require('./md2html.js');
var ejs = require('ejs');
var fs = require('fs');
var ncp = require('ncp').ncp;
var open = require('open');
var connect = require('connect');
var serveStatic = require('serve-static');



function ppt(commonds, argv) {
	if (argv.version || argv.V) {
		console.log(require('../package.json').version)
		return;
	}
	if (commonds.length === 1 && /\.md$/.test(commonds[0])) {
		create(commonds[0], argv);
		return;
	}
	console.log('当前命令不支持...')
}


function create(fullPath, argv) {
	var filePath = fullPath.replace(/\.md$/, '');
	var fileName = filePath.match('\/?([^/]+$)')[1];

	mdfile2Html(fullPath, (html) => {
		var data = {
			title: argv.title || fileName,
			html: html,
			theme: argv.theme || 'black', // beige, black, blood, league, moon, night, serif, simple, sky, solarized, white
			css: argv.css || null, //自定义样式
			js: argv.js || null, //自定义全局 js
			transition: argv.transition || 'slide', // none/fade/slide/convex/concave/zoom
			align: argv.align?'align-'+argv.align:'align-center' //内容是不是居中
		};


		ejs.renderFile(__dirname + '/../template/index.ejs', data, (err, str) => {
			if (err) throw err;
			var dir = process.cwd() + '/www/';
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			fs.writeFile(dir + fileName + '.html', str, (err) => {
				if (err) throw err;
				connect()
					.use(serveStatic(dir, {
						'index': ['index.html', 'default.htm']
					}))
					.listen(8080);

				console.log('Listening on port 8080. open http://localhost:8080/' + fileName + '.html');
				open('http://localhost:8080/' + fileName + '.html');

			});

		});
	})

}

module.exports = ppt