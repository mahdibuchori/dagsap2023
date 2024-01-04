import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Portofolio } from './Portofolio/Portofolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/login' element={<Portofolio />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
