# ppt-cli
a slides framework using makrdown

## Usage

```
ppt --help
ppt demo
ppt config
ppt file.md
ppt file.md  file.html
ppt build
ppt watch
ppt server

```


## File directory

- pptconfig.json
+ www
  + js
    - reveal.js
  + css
    - bootstrap.css
  - index.html
  - 1.html
  - 2.html
  - 3.html 
- 1.md
- 2.md
- 3.md


## config
```
{
	"theme": "dark",
	"transition": "slide",
	"files": [
		{ "1.md": "11.html" },
		{ "2.md": "22.html" },
		{ "3.md": "33.html" }
	],
	"exclude": ["readme.md"], 
	"custom": {
		"css": "assets/ppt.css"
	},
	"index": {
		"title": "饥人谷知识树"
	}
}

```




