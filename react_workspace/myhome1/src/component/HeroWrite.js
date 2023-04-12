import axios from "axios";
import React, {useState} from "react";


function HeroWrite(props){
    const [hero_name, setHeroName]=useState(""); 
    //useState함수가 문자열 변수, 변수값 바꾸는 함수를 만들어서 배열 형태로 전달
    const [hero_desc, setHeroDesc]=useState("");

    //input 태그에 값이 바뀌면 이 함수 호출
    const heroNameChange=(e)=>{
        setHeroName(e.target.value);
    }
    const heroDescChange=(e)=>{
        setHeroDesc(e.target.value);
    }

    //form 태그를 써서 서버로 전송할 때, <button>태그에 type="button"속성 없으면
    //버튼을 누를 때 submit() 함수가 호출된다
    //submit 함수가 호출되면 form 태그에 onSubmit이벤트 핸들러 호출된다.
    //이 때 잡아채서 서버에 전송하는 처리를 한다
    //onSunmit 함수의 경우 무조건 서버로 전송
    //이걸 막기 위해서 preventDefault()함수를 호출
    const onSubmit=(e)=>{
        e.preventDefault(); //form태그를 통해 서버에 정보 전송 전에 호출
                            //버튼의 기본 기능 정지
                            //submit버튼의 submit 기능을 막고, 별도의 처리를 한다
        //Spring은 데이터를 문자열로 와야 받는다
        //Axios는 JSON으로 데이터를 주고받는다
        axios.post("http://localhost:9090/hero/write",
            {hero_name:hero_name, hero_desc:hero_desc})
        .then((res)=>{
            console.log(res.data.result);
            window.location.reload(); //화면 다시 불러오기
            //location 객체는 원래 존재하는데 부모가 윈도우
            //react가 아니면 location.reload()만 호출
            //react는 window.location.reload() 호출
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div>
            <form onSubmit={onSubmit} >
                <h3>HERO</h3>
                이름 : <input type="text" onChange={heroNameChange}></input><br />
                업적 : <input type="text" onChange={heroDescChange}></input><br />

                <button>추가</button>
            </form>
        </div>
    )
}

export default HeroWrite;