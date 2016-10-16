# ppt-cli
a slides framework using makrdown

## Usage

```
ppt file.md 

ppt a.md --theme=black --transition=zoom

ppt https://raw.githubusercontent.com/jirengu/server-mock/master/README.md

```

### Available parameters

- --theme: theme of your slide. You can set `beige, black, blood, league, moon, night, serif, simple, sky, solarized, white`.  Default is black.
- --transition: Transition effect of you slide. You can set `none/fade/slide/convex/concave/zoom`. Default is slide.
- --align: Align of your text. You can set  left/center/right. Default is left.
- --css: Custom style sheets. eg: --css="http://mystyle.com/index.css"
- --js: Custom js. eg: --js="./js/index.js"
- --title: Slide title

## Silde source file example

example.md

```
# a slides framework using mardkown

by ruoyu@jirengu

## why use ppt-cli?
- easy to install
- easy to use
- easy to deply

## how to use?{.align-center}


### install ppt-cli
	run
	```
	npm install -g ppt-cli
	```

### write markdown file
write markdown file that will be translated to html file
eg: example.md

### run command

run 

	```
	ppt example.md
	```


```








