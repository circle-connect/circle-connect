import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sales from './component/SalesUsers.js';
import Admin from './component/Admin.js';
import User from './component/User.js';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Admin/>} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/Sales" element={<Sales />} />
      </Routes>
    </Router>
  );
}

export default App;
