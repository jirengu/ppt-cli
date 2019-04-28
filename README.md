# ppt-cli
A slides creator framework by using markdown.

## How to use


### Step 1, install ppt-cli
Run 

```bash
npm install -g ppt-cli
```


#### Step 2, write markdown file
Write markdown file which would be translated to html file.

Your can alse use an online markdown file such as `https://raw.githubusercontent.com/jirengu/server-mock/master/README.md`

#### Step 3, run command

Run  

```bash
ppt file.md 

ppt file.md --theme=black --transition=zoom

ppt https://raw.githubusercontent.com/jirengu/server-mock/master/README.md

```

### Available parameters

- `--theme`: theme of your slide. You can set `beige, black, blood, league, moon, night, serif, simple, sky, solarized, white, star`.  Default is league.
- `--transition`: Transition effect of you slide. You can set `none/fade/slide/convex/concave/zoom`. Default is slide.
- `--align`: Align of your text. You can set  left/center/right. Default is left.
- `--css`: Custom style sheets. eg: --css="http://mystyle.com/index.css"
- `--js`: Custom js. eg: --js="./js/index.js"
- `--title`: Slide title

## Markdown file example

example.md

```
# A slides framework using mardkown

By ruoyu@jirengu

## Why use ppt-cli?
- Easy to install
- Easy to use

### Easy to install
Install this tool by only one command.

### Easy to use
Use this tool by only one command.

## How to use
Run `npm install -g ppt-cli`.

## Thanks

```

## More usage


### Adding custom attributes
Add id(header), class(layout) and data-name(hunger valley) to current `<h3>` element and current section `<section>` element .
	
```bash
### title{#header .layout data-name="hunger valley"}
<style>
#header {
  color: red;
}
</style>

```
### Using JavaScript

```
### title
<script>
alert(1)
</script>

```
Javascript belong to current section will run automatically when slides turning to this section.


### Using HTML
```
<button id="btn">click me</button>
<script>
  btn.onclick = function(){
    alert('I am clicked')
  }
</script>
```



### Custom content align 
- add a class `align-left` to current section which align the content to left
- add a class `title-center` to current title(h3), which align the title to center

```bash
### Section title{.title-center .align-left}
```


### Using custom background images 
```
### Section with background image {data-background-image="http://cdn.jirengu.com/book.jirengu.com/img/6.jpg"}
```

### Using custom background color
```
###  Section with custom background color{data-background-color="blue"}
```



### More effect?
Visit [https://github.com/hakimel/reveal.js](https://github.com/hakimel/reveal.js)








