import {
  BrowserRouter as Router,
  Routes,
  Route,

  BrowserRouter
} from 'react-router-dom';
import Homepage1 from './home/test/Homepage1';
function App() {
  return (
 
      <Router>
        <div >
          <Routes>
            <Route path="/home/test/Homepage1.html" element={< Homepage1 />}></Route>
          </Routes>
        </div>
      </Router>
  );


}
export default App;
