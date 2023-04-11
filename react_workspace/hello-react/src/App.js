import logo from './logo.svg';
import './App.css';
import Mycomponent1 from './component/mycomponent1.js';
import Appclass from './component/Appclass';
import Appclass2 from './component/Appclass2';
import Inputtest from './component/Inputtest';

function App() {
  return (
    <div className="App">
      <Mycomponent1/>
      {/* <Appclass address="서울시 성동구" title="인적사항"/>
      <Appclass2 address="서울시 관악구" title="인적사항2"/> */}
      {/* 이  값을 pops이 받는다. */}
      <Inputtest />
    </div>
  );
}

export default App;
