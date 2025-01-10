import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import DonatePage from './components/DonatePage';
import ContactUsPage from './components/ContactUsPage';
import ScheduleAppointmentPage from './components/ScheduleAppointment';
import FinalPage from './components/finalpage';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/contact" element={<ContactUsPage />} />
      <Route path="/schedule" element={<ScheduleAppointmentPage />} />
      <Route path="/final" element={<FinalPage />} />
    </Routes>
  );
}

export default App;
