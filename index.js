const express = require('express')
const bodyParser = require("body-parser")
const colors = require('colors');
const ejs = require('ejs')
let {PythonShell} = require('python-shell')
const session = require('express-session');

app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: false,
    resave: false
}));
start = ["@2021 Aryan Python Playground"," "]
app.get('/',(req,res)=>{
    res.render('main', {results:start, code:"# Write your Code here"})
})
app.get("/output",(req,res)=>{
    res.redirect('/')
})
app.post('/output', (req,res)=>{
    var script = req.body.code_inp
    if (script.includes('webbrowser') || script.includes('matplotlib') || script.includes('os') || script.includes('subprocess')){
        var err = "module blocked"
        res.render('main', {results: [err], code:script})

    }else{
        console.log(script)
        PythonShell.runString(script,null,function(err, results){
            if(err){
                res.render('main', {results: [err], code:script})
            }
            else{
                req.session.start = start.concat(results)
                res.render('main', {results:req.session.start, code:script})
            }
        })
    }
})


app.listen(80, function () {
    console.clear()
    console.log("Initializing server on port 80".red)
    console.log("Server started!".green)
})
  