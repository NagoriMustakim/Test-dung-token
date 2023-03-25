import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import Homepage1 from './Home/Test/Homepage1';
function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/home/test/homepage1.html' element={< Homepage1 />}></Route>
        </Routes>
      </div>
    </Router>
  );


}
export default App;
