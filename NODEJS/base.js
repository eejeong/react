let http = require("http");

let server = http.createServer((request, response)=> {

    if(request.method=="POST"){
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        response.end("<H1>POST</H1>");
    } else {
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        response.end("<H1>GET</H1>");
    }
}).listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
});