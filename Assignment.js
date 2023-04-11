import React, {useState} from "react";

function Assignment(props) {
  const [name, setName] = useState("");
  const [kor, setKor] = useState("");
  const [eng, setEng] = useState("");
  const [mat, setMat] = useState("");
  const [result, setResult]=useState("");

  const nameChange=(e)=>{
    setName(e.target.value); 
  }

  const korChange=(e)=>{
    setKor(parseInt(e.target.value));
  }

  const engChange=(e)=>{
    setEng(parseInt(e.target.value));
  }

  const matChange=(e)=>{
    setMat(parseInt(e.target.value));
  }

  function resultChange(){
    let sum=(parseInt(kor)+parseInt(eng)+parseInt(mat));
    let avg = sum/3;
    setResult(`${name}의 총점은 ${sum} 이고 평균은 ${avg} 입니다.`);
  }
  
  return (
    <div>
      이름 : <input type="text" onChange={nameChange}/><br/><br/>
      국어 : <input type="text" onChange={korChange} /><br/><br/>
      영어 : <input type="text" onChange={engChange} /><br/><br/>
      수학 : <input type="text" onChange={matChange} /><br/><br/>
      <button type="button" onClick={resultChange}>결과 확인</button><br/><br/>
    <div>{result}</div>
    </div>
    );
}

export default Assignment;
