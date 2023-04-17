import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVERIP } from '../../CommonUtil';
import { Link, useNavigate, useParams } from "react-router-dom";

function BoardWrite(props){
    let {id} = useParams(); //보내는 쪽에서 json 객체로 보냄
    let history = useNavigate();

    // const [title, setTitle]=useState("");
    // const [writer, setWriter]=useState("");
    // const [contents, setContents]=useState("");
    // const [file, setFile]=useState("");
    // 위의 변수 4개를 하나의 JSON 객체로 저장. 필드가 많을 때 주로 사용
    const [inputs, setInputs] = useState({
        title:'', writer:'', contents:'', filename:''
    });

    // useEffect(()=>{
    //     async function loadData(){
    //         let results = await axios.get(SERVERIP+"/board/view/"+id);
    //         console.log(results.data.board.title);
    //         console.log(results.data.board.writer);
    //         console.log(results.data.board.contents);

    //         setInputs(results.data.board);
    //         // setTitle(results.data.board.title);
    //         // setWriter(results.data.board.writer);
    //         // setContents(results.data.board.contents);
    //         // setFile(results.data.board.file);
    //     }
    //     if( id!=undefined) //write가 아니고 view로 호출할 때
    //         loadData();
    //     // window.onload 역할
    //     // BoardWrite 컴포넌트가 /board/write일 때는 id:undefined
    //     // /board/view/1일 때는 id에는 파라미터 값이 저장 (id:1)
    // },[]);

    // const titleChange=(e)=>{
    //     setTitle(e.target.value);
    // }
    // const nameChange=(e)=>{
    //     setWriter(e.target.value);
    // }
    // const contentsChange=(e)=>{
    //     setContents(e.target.value);
    // }
    // const fileChange=(e)=>{
    //     setContents(e.target.value);
    // }
    // 위 4개의 함수를 onchange 하나로 처리 -> 모든 필드의 이벤트 처리를 여기에서 한다
    const onChange=(e)=>{
        const {value, name} = e.target; //입력 객체로부터 값과 이름 가져온다
        console.log(value, name);
        setInputs({...inputs, [name]:value }); //{...inputs} : json객체 복사
    }

    // let temp = inputs;
    // temp[name] = value;
    // setInputs(temp);
    // 위 코드를 한줄로 변경하면 -> setInputs({...inputs, [name]:value }); 

    //서버로 전송하기
    const postData=()=>{
        //데이터를 json으로 묶어서 보내야 한다.
        let formData = new FormData(); // 파일을 전송할 때 반드시 이 객체로 보내야 한다
        formData.append("title", inputs.title);
        formData.append("writer", inputs.writer);
        formData.append("contents", inputs.contents);
        formData.append("file", window.document.myform.file.files[0]);
        //파일 첨부시 자바스크립트가 파일이 여러개 첨부하는 것으로 처리 -> 무조건 배열의 형태
        //document.폼이름.file태그의 name속성.files[0];
        //여러개 추가 가능

        //let data = {"title":title, "writer":writer, "contents":contents};
        axios.post(SERVERIP+"/rest_board/save", formData)
        .then((res)=>{
            console.log(res.data);
            history("/board/list"); //redirect에 대응
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    //json을 각각의 변수로 해체(destrunction)
    const {title, writer, contents, file} = inputs;

    return(
        <div className="container">
        <form name="myform" encType='multipart/form-data'>
            <h1>게시판 글쓰기</h1>
                <table className="table table-hover " style={{marginTop: "30px"}}>
                <colgroup>
                    <col width="25%"/>
                    <col width="*"/>
                </colgroup>
            
                <tbody>
                <tr>
                    <td>제목</td>
                    <td>
                        <div className="mb-3" style={{marginTop: "13px"}}>
                            <input type="text" className="form-control" 
                            value={title} name="title"
                            placeholder="제목을 입력하세요" onChange={onChange}/> 
                        </div>
                    </td>
                </tr>       
                <tr>
                    <td>작성자</td>
                    <td>
                        <div className="mb-3" style={{marginTop: "13px"}}>
                            <input type="text" className="form-control"  
                            value={writer} name="writer"
                            placeholder="이름을 입력하세요" onChange={onChange}/>
                        </div>
                    </td>
                </tr>   
                <tr>
                    <td>내용</td>
                    <td>
                        <div className="mb-3" style={{marginTop: "13px"}}>
                            <input type="text" className="form-control"  
                            value={contents} name="contents"
                            placeholder="내용을 입력하세요" onChange={onChange}/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>파일</td>
                    <td>
                        <div className="mb-3" style={{marginTop: "13px"}}>
                            <input type="file" className="form-control"  
                            value={file} name="title"
                            placeholder="파일을 업로드하세요" onChange={onChange}/>
                        </div>
                    </td>
                </tr>                   
                </tbody>
            </table>

            <div className="container mt-3" style={{textAlign: "right"}}>
                <Link className="btn btn-secondary" onClick={postData}>등록</Link>&nbsp; &nbsp;
                <Link className="btn btn-secondary">취소</Link>
            </div>
        </form>
        </div>
    );
}

export default BoardWrite;