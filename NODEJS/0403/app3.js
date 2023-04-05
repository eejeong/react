const { response } = require("express");
var express = require("express");
var app = express(); //서버 만들었음

//express 모듈 자체가 use, get, post 함수 3개가 있음
//use - get, post 둘 다 처리
//get - get 방식으로 온 것만 처리
//post - post 방식으로 온 것만 처리

//bodyParser 모듈이 있는데 모듈을 설치하고 =>express 자체적으로 
//body에 데이터를 가져온다
app.use(express.urlencoded({extended:false}));
//미들웨어, app 객체 만들고, 다른 url 처리 전에만 호출되면 된다

app.post("/add", (request, response)=>{
    let x = request.body.x;
    let y = request.body.y;
    let z = parseInt(x) + parseInt(y);
    response.send({x:x, y:y, z:z});
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<H1>Express</H1>")
});

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})

//get 방식의 경우 ?x=4&y=5 request.query.x
//get 방식의 경우 /4/5 request.params.x
//post의 경우는 app.use(express.urlencoded({extended:false})); 가 선행되고 나면 request.body.x로 처리
