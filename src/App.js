import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';
import { Homepage1 } from './home/test/Homepage1';
import { Test } from './Component/Test';
function App() {
  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route path="/" element={< Test />}></Route>
          <Route path="home/test/homepage1.html" element={< Homepage1 />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );


}
export default App;
