# ppt-cli
a slides framework using makrdown

## Usage

```
ppt file.md 

ppt a.md --theme=black --center=true --transition=zoom

```

### Available parameters

- --theme: theme of your slide. You can set `beige, black, blood, league, moon, night, serif, simple, sky, solarized, white`.  Default is black.
- --transition: Transition effect of you slide. You can set `none/fade/slide/convex/concave/zoom`. Default is slide.
- --center: Position of your content. You can set  ture/false. Default is true.
- --style: Custom style sheets. eg: --sytle="http://mystyle.com/index.css"
- --title: Slide title

## Silde source file example
A simple example

```
	----

	## 一个简单好用的 markdown 制作在线 ppt 的小工具

	by 饥人谷同学

	----

	## 有什么优势
	1. ppt 使用 markdown 的格式来写
	2. 可一个命令转换成 html
	3. 支持多种风格样式
	4. 支持代码
	5. 还有更多其妙的功能
	1. ppt 使用 markdown 的格式来写
	2. 可一个命令转换成 html
	3. 支持多种风格样式
	4. 支持代码
	5. 还有更多其妙的功能


	## 怎样用

	1. 安装 ppt-cli, ```npm install -g ppt-cli```
	1. 写一个 markdown 文件，使用`----`做为页面分割符号
	3. 执行 ```ppt 文件名.md``` 即可

	----
	## 支持 markdown 语法 

	```
	npm install -g ppt-cli
	```
	----
	## 支持 HTML, JavaScript
	```
	<button id="btn">点我</button>
	<script>
	document.querySelector('#btn').onclick = function(){
		alert('hello world')
	}
	</script>
	```
	<button id="btn">点我</button>
	<script>
	document.querySelector('#btn').onclick = function(){
		alert('hello world')
	}
	</script>

```


A complex example

```
	----
	## 一个简单好用的 markdown 制作在线 ppt 的小工具

	by饥人谷同学

	----
	## 有什么优势
	1. ppt 使用 markdown 的格式来写
	2. 可一个命令转换成 html
	3. 支持多种风格样式
	4. 还有更多其妙的功能


	++++
	## 怎样用

	`----`可创建左右滚动的主页面
	`++++`可上下滚动的子页面

	++++#page3.red data-name=ruoyue
	## 怎么用
	可以给当前页面元素添加id,class 自定义属性

	++++
	## 怎么用{#book}
	可以使用`{#book.layout data-src=123}`给任意元素添加属性

	++++
	## 怎么用
	可以直接写 html，css，js

	++++
	## 怎么用
	可以根据添加的属性(id class 自定义属性)结合 CSS、JS 做更多有趣的事情

```





