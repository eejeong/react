import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVERIP } from '../../CommonUtil';
import { Link, useNavigate, useParams } from "react-router-dom";

function BoardWrite(props){
    let {id} = useParams(); 
    let history = useNavigate();

    const [inputs, setInputs] = useState({
        title:"", writer:"", contents:"", filename:""
    });

    const onChange=(e)=>{
        const {value, name} = e.target; 
        console.log(value, name);
        setInputs({...inputs, [name]:value }); 
    }

    useEffect(()=>{
        async function loadData(){
            let results = await axios.get(SERVERIP+"/board/view/"+id);
            console.log(results.data.board.title);
            console.log(results.data.board.writer);
            console.log(results.data.board.contents);
            console.log(results.data.board);

            setInputs(results.data.board);
        }
        if( id!=undefined) //write가 아니고 view로 호출할 때
            loadData();
    },[]);

    const postData=()=>{
        let formData = new FormData(); 
        formData.append("title", inputs.title);
        formData.append("writer", inputs.writer);
        formData.append("contents", inputs.contents);
        formData.append("file", window.document.myform.file.files[0]);

        axios.post(SERVERIP+"/rest_board/save", formData)
        .then((res)=>{
            console.log(res.data);
            history("/board/list"); 
        })
        .catch((error)=>{
            console.log(error);
        });
    }

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
                            value={file} name="file"
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