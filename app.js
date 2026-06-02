const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

app.set('view engine', 'ejs');
app.set('views', './view');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "node_modules/jquery/dist/")));

function toTitleCase(text){
    return text + ":)"
}


var html = fs.readdirSync("./public/html")

const navbar = []
html.forEach((file) => {
    const __filebase = path.basename(file, ".html")
    const filebase = __filebase.replace(/[0-9A-Z]/g,"")
    var current = {
        link: filebase.replace("home",""),
        text: filebase.replace("home",`<span class="glyphicon glyphicon-home"></span> home`),
    }
    navbar.push(current)
})

html.forEach((file) => {
    const __filebase = path.basename(file, ".html")
    const filebase = __filebase.replace(/[0-9A-Z]/g,"")
    app.get("/"+encodeURIComponent(filebase.replace("home","")), (req, res) => {
        const data = {
            isJStrue: fs.existsSync(`./public/js/${filebase}.js`),
            isCSStrue: fs.existsSync(`./public/css/${filebase}.css`),
            file: filebase,
            navbar:navbar,
            content: fs.readFileSync(`./public/html/${__filebase}.html`, 'utf8')
        }
        res.render('index', data);
    });
});

app.all('*splat', (req, res) => {
    const data = {
        isJStrue: false,
        isCSStrue: false,
        file: "404",
        navbar:navbar,
        content: fs.readFileSync(`./public/404.html`, 'utf8')
    }
    res.status(404).render('index', data);
});

app.listen(port, (err) => {
    console.log(`Express server running at http://localhost:${port}`);
});