var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');

/* GET home page. */
router.get('/list', async function(req, res, next) {
    let sql=`
      SELECT A.id
      , A.student_name
      , A.kor
      , A.eng
      , A.mat
      , DATE_FORMAT(A.wdate, '%Y-%m-%d') wdate 
      FROM tb_score A;
      `;
    let results = await commonDB.mysqlRead(sql, []);
    console.log(results);
    res.json(results);
  });

//http://localhost:9090/score/view/1
router.get('/view/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let sql = `select * from tb_score where id=${id}`;
    let results = await commonDB.mysqlRead(sql,[]);
    res.json({"result":"success", "score":results[0]});
  }
  catch(e) {
    console.log(e);
    res.json({"result":"fail"});
  }
});

router.get('/update', async function(req, res, next) {
    try {
      let id = req.params.id;
      let student_name = req.body.student_name;
      let kor = req.body.kor;
      let eng = req.body.eng;
      let mat = req.body.mat;
      let sql=`
        update tb_score set student_name=?
        , kor=?, eng=?, mat=? where id=?`;
        await commonDB.mysqlRead(sql, [student_name, kor, eng, mat, id]);
        res.json({"result":"success"})
    }
    catch(e){
      console.log(e);
      res.json({"result":"fail"});
    }
  });
  
  router.post('/write', async function(req, res, next) {
    try {
      let student_name = req.body.student_name;
      let kor = req.body.kor;
      let eng = req.body.eng;
      let mat = req.body.mat;
      let sql = `
      INSERT INTO tb_score(student_name, kor, eng, mat, wdate)
      VALUES(?,?,?,?, now());
      `;
      await commonDB.mysqlRead(sql, [student_name, kor, eng, mat]);
      res.json({"result":"success"});
    }
    catch(e) {
      console.log(e);
      res.json({"result":"fail"});
    }
  });  
module.exports = router;
