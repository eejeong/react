let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* GET home page. */
router.get('/list/:pg', async function(req, res, next) {
  let pg = parseInt(req.params.pg);
  //pg=1 0 (pg-1)*10
  //pg=2 10 (2-1)*10 10
  //pg=3 20 

  //전체 데이터 개수 확인
  let sql=`
    select count(*) cnt from
    (
      SELECT A.id, A.title, A.writer, A.wdate
      , @rownum:=@rownum+1 num
      from tb_board A, (SELECT @rownum:=0) B
    ) A
    LEFT OUTER JOIN tb_member C on A.writer=C.userid
  `;
  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql = `
  SELECT A.id, A.title, A.writer, A.num, A.username
  , date_format(A.wdate, '%Y-%m-%d') wdate
  FROM
  (
    SELECT A.*, C.username from 
    (
      SELECT A.id, A.title, A.writer, A.wdate
      ,@rownum:=@rownum+1 num
      FROM tb_board A, (SELECT @rownum:=0) B
    ) A
    LEFT OUTER JOIN tb_member C ON A.writer=C.userid
    ORDER BY id desc
  )A
  LIMIT ${(pg-1)*10}, 10
  `;

  results = await commonDB.mysqlRead(sql, []);
  res.render('board/board_list', {
    session: req.session,
    boardList: results,
    totalCnt: totalCnt,
    pg:pg,
    paging:commonUtil.getPaging(pg, totalCnt)
  });
});

router.get('/view/:id', async function(req, res, next) {
  let id = req.params.id;
  let sql = `select * from tb_board where id=${id}`;
  let results = await commonDB.mysqlRead(sql, []);
  let boardItem = results[0]; 
  res.render("board/board_view", { board:boardItem });
});


module.exports = router;



// sql =`SELECT A.id, A.title, A.writer, A.num, A.username
//   , date_format(A.wdate, ‘%Y-%m-%d’) wdate
// FROM
// (
//   SELECT A.id, A.title, A.writer, A.wdate, c.username
//   ,@rownum :=@rownum+1 num
//   FROM tb_board A
//   LEFT OUTER JOIN tb_member c ON a.writer=c.userid
//   CROSS JOIN (SELECT @rownum:=0) B on 1=1
//   ORDER BY id DESC
// )A
// ORDER BY id ASC
//   LIMIT ${(pg-1)*10}, 10 `