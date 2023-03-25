import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Homepage1 from './home/test/Homepage1';

function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route exact path='/home/test/homepage1.html' element={< Homepage1 />}></Route>
        </Routes>
      </div>
    </Router>
  );


}
export default App;
