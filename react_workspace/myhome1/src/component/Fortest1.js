//Fortest1.js
import React, {useCallback, useState} from "react";

function Fortest1(props){
    const [fruitList] = useState(["사과", "배", "포도", "수박", "머루"]);

    const goSelect=(index)=>{
        alert(fruitList[index]);
    }

    return(
        <div>
            <ul>
            {
                fruitList.map((item, index)=>{
                    return(
                        <li key={index}>
                            <a href="#none" onClick={()=>{goSelect(index)}}>{item}</a>
                            {/* 클릭시 스크롤 이동함. a href = none을 넣으면 고정 가능 */}
                        </li>
                    );
                })
            }
            </ul>
        </div>
    )
}
export default Fortest1;