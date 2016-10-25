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

## how to use?


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

## More usage


### Adding custom attributes
```
### title{#header.layout data-name="hunger valley"}
add id(header), class(layout) and data-name(hunger valley) to current element <h3> and current section <section>

```
### Using javascript
```
### title
<script>
alert(1)
</script>

```
Javascript belong to current section will run automatically when turning to this section

<script>
alert(1)
</script>

### Using HTML
```
<button id="btn">click me</button>
<script>
  btn.onclick = function(){
    alert('I am clicked')
  }
</script>
```
<button id="btn">click me</button>
<script>
  btn.onclick = function(){
    alert('I am clicked')
  }
</script>



### Custom content align {.align-center}
> add a class `align-center` to current section by using {.align-center} after the title

### Using custom background images {data-background-image="http://cdn.jirengu.com/book.jirengu.com/img/6.jpg"}
```
### Section with background image {data-background-image="http://cdn.jirengu.com/book.jirengu.com/img/6.jpg"}
```

### Using custom background color {data-background-color="blue"}
```
###  Section with custom background color{data-background-color="blue"}
```



### More effect?
visit [https://github.com/hakimel/reveal.js](https://github.com/hakimel/reveal.js)








