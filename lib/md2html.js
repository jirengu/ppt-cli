var md = require('markdown-it')({
	html: true
});
var markdownItAttrs = require('markdown-it-attrs');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

md.use(markdownItAttrs);


function start(filename, callback) {
	if (/^http/.test(filename)) {
		request(filename, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				md2Html(body, callback);
			} else {
				console.log('load ' + filename + ' error...');
			}
		})
	} else {
		fs.readFile(filename, (err, data) => {
			if (err) throw err;
			var fileStr = data.toString();
			md2Html(fileStr, callback);
		});
	}
}

function md2Html(fileStr, callback) {
	var html;
	if (/(\n|^)[-+]{3,}.{0,}\n/gm.test(fileStr)) {
		html = getHtmlFromMarkedMarkdown(fileStr);
	} else {
		html = getHtmlFromPureMarkdown(fileStr);
	}

	html = parseScript(html);

	callback(html);
}


//把纯净版的 markdown 字符串转换成 slide html

function getHtmlFromPureMarkdown(srcStr) {
	var html = md.render(srcStr);
	var isFirst = true;
	var newstr = html.replace(/<h[123]( class=".+?")?>/igm, function() {
		if (isFirst) {
			isFirst = false;
			return ' <section>' + arguments[0];
		}
		return '</section><section class="' + arguments[0].replace(/[<>]/g, '') + '">' + arguments[0];
	})
	newstr += '</section>';
	var $ = cheerio.load(newstr);
	$('.h3').each(function() {
		$('<section class="down"></section>').insertBefore($(this).prev('.h2'))
	})

	$('.down').each(function() {
		$(this).next('.h2').appendTo($(this));
		$(this).nextUntil('.h2,.down,.h1').appendTo($(this));
	})

	$('h1,h2,h3').each(function() {
		if ($(this).hasClass('align-left')) {
			$(this).parent('section').addClass('align-left')
		}
		if ($(this).hasClass('align-right')) {
			$(this).parent('section').addClass('align-right')
		}
		if ($(this).hasClass('align-center')) {
			$(this).parent('section').addClass('align-center')
		}
	})

	return $.html();
}

//把带分割标记的markdown 字符串转换成 slide html
function getHtmlFromMarkedMarkdown(srcStr) {
	var result = parseSource(srcStr);
	var html = md.render(result);
	return html;
}



function parseSource(str) {
	var pat = /(\n|^)[-+]{3,}.{0,}\n/gm;
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

function insertStr(str, pos, padding) {
	var arr = str.split('');
	arr.splice(pos, 0, padding);
	str = arr.join('');
	return str;
}


function key2attr(key) {
	var k = key.replace(/[-+]{3,}/, '').trim();
	if (k === '') return '\n<section>\n\n';

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

	html += '>\n\n';
	return html;
}


//把源文件里的 script 标签里面的内容放到对应页面 section 的自定义属性上，后续翻页到对应页面后才执行 js
function parseScript(html) {
	var $ = cheerio.load(html);
	$('script').each((i, elem) => {
		var $script = $(elem);
		var $section = $script.parents('section');
		$section.attr('data-script', encodeURIComponent($script.html()));
		$script.remove();
	})
	return $.html();

}


module.exports = start;