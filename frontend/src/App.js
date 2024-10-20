import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import SellerDashBoard from './Components/SellerDashBoard';
import BuyerDashBoard from './Components/BuyerDashBoard';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/sellerdashboard' element={<SellerDashBoard />} />
          <Route path='/buyerdashboard' element={<BuyerDashBoard/>}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
