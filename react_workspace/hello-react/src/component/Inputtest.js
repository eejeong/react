import React, {useState} from "react";

// props 사용하던 말던 기본 매개변수로 사용하자
function Inputtest(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  //람다함수 : 일반함수의 경우 생성자에서 바인딩이라는 작업을 해야한다
  const nameChange=(e)=>{
    //인자가 발생한 이벤트에 대한 모든 정보
    console.log(e.target.value); //키를 누른 값이 저장되어 있다
    setName(e.target.value); //name 변수의 값 변경
  }

  const ageChange=(e)=>{
    setAge(e.target.value);
  }

  const emailChange=(e)=>{
    setEmail(e.target.value);
  }

  let mystyle={
    color:"white",
    backgroundColor:"lightpink",
    fontSize:"10px",
    padding:"10px 5px 10px 5px",
    margin:"10px"
  }
  return (
    <div>
      이름 : <input type="text" onChange={nameChange} style={{color:"red", backgroundColor:"lightblue"}}/><br/>
      나이 : <input style={mystyle} type="text" onChange={ageChange} /><br/>
      이메일 : <input type="text" onChange={emailChange} /><br/>
      <p>{name} {age} {email}</p>
    </div>
  );
}

export default Inputtest;