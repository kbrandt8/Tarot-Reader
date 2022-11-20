import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  OneCard,
  Start,
  ThreeCards,
  TodaysCard,
  Login,
  Register,
  Dashboard,
  Account,
  FourCards,
  CelticCross
} from './pages'

import Nav1 from './Nav';
import Footer from './Footer';
function App() {
  return (<div> 
    <BrowserRouter basename='/' >
      <Nav1 />
      <main>

        <Routes>
          <Route  path="/" element={<Start />} />

          <Route path="/FourCardReading" element={<FourCards />} />
          <Route path="/ThreeCardReading" element={<ThreeCards />} />

          <Route path="/OneCardReading" element={<OneCard />} />

          <Route path="/TodaysCard" element={<TodaysCard />} />
          <Route path="/CelticCrossReading" element={<CelticCross />} />
          
          <Route path="/Login" element={<Login />} />

          <Route path="/Register" element={<Register/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Account" element={<Account/>}/>

        </Routes>

      </main>
       <Footer/>
    </BrowserRouter>
  
  </div>
  );
}

export default App;
