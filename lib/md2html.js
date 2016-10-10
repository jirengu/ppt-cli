var md = require('markdown-it')({
  html: true
});
var markdownItAttrs = require('markdown-it-attrs');
var fs = require('fs');
var cheerio = require('cheerio');


md.use(markdownItAttrs);


function md2Html(filename, callback) {
	fs.readFile(filename, (err, data) => {
		if (err) throw err;
		var fileStr = data.toString();
		var result = parseSource(fileStr);
		var html = md.render(result);
		html = parseScript(html);

		callback(html);
	});

}





function parseSource(str) {
	var pat = /[-+]{3,}.{0,}\n/gm;
	var search;
	var lastKey;
	var isFirst = true;

	do {
		search = pat.exec(str);
		if (search) {
			var key = search[0];
			if (key.indexOf('---') > -1) {
				if (isFirst) {
					str = replaceStr(str, key, search['index'])
				} else if (lastKey.indexOf('+++') > -1) {
					str = replaceStr(str, key, search['index'], '\n</section>\n</section>')
				} else {
					str = replaceStr(str, key, search['index'], '\n</section>\n')
				}
			} else if (key.indexOf('+++') > -1) {
				if (isFirst) {
					str = replaceStr(str, key, search['index'])
				} else if (lastKey.indexOf('---') > -1) {
					str = replaceStr(str, key, search['index'])
				} else {
					str = replaceStr(str, key, search['index'], '\n</section>\n')
				}
			}
			lastKey = key;
			isFirst = false;
		}
	} while (search != null)

	if (lastKey.indexOf('---') > -1) {
		str += '\n</section>\n';
	} else if (lastKey.indexOf('+++') > -1) {
		str += '\n</section>\n</section>\n';
	}

	return str;

}


function replaceStr(str, key, pos, padding) {
	var arr = str.split('');
	var replace = key2attr(key);
	if (padding) {
		replace = padding + replace;
	}
	arr.splice(pos, key.length, replace);
	str = arr.join('');
	return str;
}

function key2attr(key) {
	var k = key.replace(/[-+]{3,}/, '').trim();
	if (k === '') return '\n<section>\n';

	var html = '\n<section ';
	var attrs = k.split(/\s/);

	attrs.forEach((attr) => {
		if (attr.split('=').length === 2) {
			html += attr + ' ';
		} else {
			var classIdArr = attr.match(/[.#][a-zA-Z-]+/g);
			var classArr = classIdArr.filter((val) => {
				return val.indexOf('.') >= 0
			}).map((val) => {
				return val.substr(1)
			});
			var idArr = classIdArr.filter((val) => {
				return val.indexOf('#') >= 0
			}).map((val) => {
				return val.substr(1)
			});

			if (classArr.length > 0) {
				html += ' class="';
				classArr.forEach((val) => {
					html += val + ' ';
				})
				html = html.trimRight();
				html += '" ';
			}
			if (idArr.length > 0) {
				html += ' id="' + idArr[0] + '" ';
			}
		}
	})

	html += '>\n';
	return html;
}

function parseScript(html){
	console.log(html)
	var $ = cheerio.load(html);
	console.log($('script').parent().attr('id'))
	$('script').each((i, elem)=>{
		var $script = $(elem);
		var $section = $script.parents('section');
		$section.attr('data-script', encodeURIComponent($script.html()) );
		$script.remove();
	})
	return $.html();
 
}


module.exports = md2Html;




