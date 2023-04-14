//부트스트랩 라이브러리
import 'bootstrap/dist/css/bootstrap.min.css'  
/* min이 압축버전이라 속도가 빠름 */

import {Outlet, Link, NavLink} from "react-router-dom";

function Layout() {
    return(
        //a 태그(anchor) 사용시 페이지 전체 새로고침
        //NavLink 사용
        <div>
            <nav className="navbar navbar-expand-sm bg-success navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/board/list">게시판</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/hero/list">영웅</NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                    </ul>
                </div>
            </nav>
            <div style={{marginTop:"20px"}} />
            <Outlet/>  {/* 컴포넌트가 출력되는 위치 */}
        </div>
    )
}

export default Layout;