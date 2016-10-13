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
			title: argv.title||fileName,
			html: html,
			theme: argv.theme || 'black', // beige, black, blood, league, moon, night, serif, simple, sky, solarized, white
			style: argv.style || null,  //自定义样式
			transition: argv.transition || 'slide', // none/fade/slide/convex/concave/zoom
			center: argv.transition||true //内容是不是居中
		};


		ejs.renderFile(__dirname + '/../template/index.ejs', data, (err, str) => {
			if (err) throw err;
			var dir = process.cwd() + '/www/';
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			fs.writeFile(dir + fileName + '.html', str, (err) => {
				if (err) throw err;

				ncp(__dirname + '/../template/static', dir, function(err) {
					if (err) {
						return console.error(err);
					}

					connect()
						.use(serveStatic(dir, {
							'index': ['index.html', 'default.htm']
						}))
						.listen(8080);

					console.log('Listening on port 8080. open http://localhost:8080/' + fileName + '.html');
					open('http://localhost:8080/' + fileName + '.html');

				});
			});

		});
	})

}

module.exports = ppt