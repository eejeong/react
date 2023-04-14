
function getPaging(pg, totalCnt, pageGroupSize=10){
 /*
 1  2  3  4  5  6  7  8  9 10  0~9     1그룹
11 12 13 14 15 16 17 18 19 20  10~19   2그룹
21 22 23 24 25 26 27 28 29 30  20~29   3그룹

(1-1)/10*10  0/10*10 = 0
(2-1)/10*10  1/10*10 = 0
(3-1)/10*10  1/10*10 = 0
...
(10-1)/10*10  1/10*10 = 0
(11-1)/10*10  = 10
(12-1)/10*10  = 10
(21-1)10*10   = 20
 */

//전체 페이지 개수, 어느 그룹에 속하는지 확인해야 함
    pnTotal = Math.ceil(totalCnt/10); //전체 페이지 개수
    //한 페이지당 데이터가 10개일 때, 15건은 2페이지... 강제 올림
    pgGroupStart = parseInt((pg-1)/pageGroupSize) * pageGroupSize+1;
    pgGroupEnd = pgGroupStart+10;
    if(pgGroupEnd>pnTotal)
        pgGroupEnd = pnTotal+1;
    console.log(pg, pgGroupStart, pgGroupEnd);
    
    //함수는 반환값이 하나이어야 함. JSON 객체로 묶어서 보내면 여러 변수를 한번에 출력
    return {pnTotal:pnTotal, pnStart:pgGroupStart, pnEnd:pgGroupEnd, pg:pg}
}
 
// for(i=1; i<=32; i++)
//     getPaging(i,320);

function checkInfo(req, checkInfos){
    msg="";
    result=0;
    resultInfo={};

    for(info of checkInfos) {
        //undefined : 상대방이 이 키값을 보내지 않은 상태
        if(req.body[info.key]==undefined) {
            msg = info.key + " is empty\n";
            result=1;
            req.body[info.key]=""; //초기화. 다음 처리를 위해서 가급적 else를 사용하지 않음
        }
        //타입체크나 범위 체크 
        if(info.type=="str" && info.range!=-1 && req.body[info.key].length>info.range) {
            msg = msg += info.key + " range error\n";
        }
        resultInfo[info.key] = req.body[info.key];
        resultInfo["result"] = result;
        resultInfo["msg"] = msg;

        return resultInfo;
    }
}

exports.checkInfo = checkInfo;
exports.getPaging = getPaging;