//http://127.0.0.1:4000/gugu?dan=4

const { response } = require("express");
var express = require("express");
var app = express(); //서버 만들었음

app.get("/gugu", (request, response)=>{
    let dan = request.query.dan;
    let result = "";
    for(i=1; i<=9; i++){
        result += `${dan} * ${i} = ${dan*i}<br/>`;
    }
    console.log(result);
    response.writeHead(200, {"Content-type":"text/html"});
    response.end(result); //데이터 보내기 완료. 
    //response.end("hello"); 데이터 보내기 완료했기 때문에 오류 발생
});

//http://127.0.0.1:4000/gugu/4
app.get("/gugu/:dan", (request, response)=> {
    let dan = request.params.dan; 
    let result = "";
    for(i=1; i<=9; i++){
        result += `${dan} * ${i} = ${dan*i}<br/>`;
    }
    console.log(result);
    response.writeHead(200, {"Content-type":"text/html"});
    response.end(result); 
})


app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<H1>Express</H1>");
});

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})
