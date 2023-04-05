const { response } = require("express");
var express = require("express");
var app = express(); //서버 만들었음

//express 모듈 자체가 use, get, post 함수 3개가 있음
//use - get, post 둘 다 처리
//get - get 방식으로 온 것만 처리
//post - post 방식으로 온 것만 처리

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<H1>Express</H1>")
});

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})