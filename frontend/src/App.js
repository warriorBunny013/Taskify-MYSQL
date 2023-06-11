
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Tasks from './components/Tasks';

function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Signup/>}/>
          <Route path='/dashboard' element={<Tasks/>}/>
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
