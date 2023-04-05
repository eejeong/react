let http = require("http");

//브라우저 http://127.0.0.1:3000 서버로 액세스 요청이 들어오면
//request 객체는 브라우저에서 요청한 정보를 담아오는 객체
//response 객체는 서버에서 클라리언트로 정보를 보낼 때 여기에 담아 보낸다
let server = http.createServer((request, response)=> {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>두번째 서버입니다</H1>") //한글은 에러 발생
}).listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
});