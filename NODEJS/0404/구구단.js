var express = require("express")
var fs = require("fs")
var ejs = require("ejs")

var app = express(); 

app.use(express.urlencoded({extended:false}));

app.get("/guguform", (request, response)=>{
    fs.readFile("../html/guguform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        response.end(ejs.render(data));
    })
});

app.get("/gugu", (request, response)=>{
    let dan = request.query.dan;   //input 태그의 name 속성
    let result = "";
    for(i=1; i<=9; i++)
        result += `<p style="color:blue;font-size:14pt">${dan} * ${i} = ${dan*i}</p>`;
    response.send(result);
});

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<H1>Express</H1>");
});

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})