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
  Account
} from './pages'

import Nav from './Nav';
import Footer from './Footer';
function App() {
  return (<div> 
    <BrowserRouter >
      <Nav />
      <main>

        <Routes>
          <Route  path="/" element={<Start />} />

          <Route path="/ThreeCards" element={<ThreeCards />} />

          <Route path="/OneCard" element={<OneCard />} />

          <Route path="/TodaysCard" element={<TodaysCard />} />
          
          <Route path="/Login" element={<Login />} />

          <Route path="/Register" element={<Register/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Account" element={<Account/>}/>

        </Routes>

      </main>
    </BrowserRouter>
   <Footer/>
  </div>
  );
}

export default App;
