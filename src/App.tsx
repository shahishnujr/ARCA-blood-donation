import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import DonatePage from './components/DonatePage';
import ContactUsPage from './components/ContactUsPage';
import ScheduleAppointmentPage from './components/ScheduleAppointment';
import FinalPage from './components/finalpage';
import DonateMoneyPage from './components/DonateMoneyPage'; // Import DonateMoneyPage (JavaScript file)
import Campaign from './components/Campaign';
const App: React.FC = () => {
  return (
    <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/donate" element={<DonatePage />} />
    <Route path="/contact" element={<ContactUsPage />} />
    <Route path="/schedule" element={<ScheduleAppointmentPage />} />
    <Route path="/final" element={<FinalPage />} />
    <Route path="/donate-money" element={<DonateMoneyPage />} />
    <Route path="/campaign" element={<Campaign/>}/>

    
  </Routes>
  
  );
};

export default App;
