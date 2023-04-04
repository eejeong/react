var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/input", (request, response) => {
  fs.readFile("third_assignment.html", "utf-8", (err, data) => {
    response.writeHead(200, { "Content-type": "text/html" });
    response.end(ejs.render(data));
  });
});

app.get("/confirm", (request, response) => {
  let name = request.query.name;
  let kor = parseInt(request.query.kor);
  let eng = parseInt(request.query.eng);
  let mat = parseInt(request.query.mat);

  result = `${name}의 총점은 ${kor+eng+mat} 점이고 평균은 ${((kor+eng+mat)/3).toFixed(2)}점입니다.`;
  response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
  response.end(result);

});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<H1>Express</H1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});