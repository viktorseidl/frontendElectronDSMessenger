 import imgs from './assets/Logo.png'
 import { HashRouter as Router, Route, Routes } from 'react-router-dom';
 import DatabaseScreen from './pages/DatabaseScreen'; 
import { useState } from 'react'; 
import { ThemeProvider } from './styles/ThemeContext'; 
import TabBar from './components/TabBar';
import LogScreen from './pages/LogScreen';
import Dashboard from './pages/Dashboard';
import Sended from './pages/Sended';
import Deleted from './pages/Deleted';
import FileExplorer from './pages/FileExplorer';
import NewMessage from './pages/NewMessage';
import ShowMessage from './pages/ShowMessage';
import ExternalLogScreen from './pages/ExternalLogScreen';
import Pinwall from './pages/Pinwall';
import Calendarwall from './pages/Calendarwall';
import CalendarDay from './pages/CalendarDay';
import CalendarDayToday from './pages/CalendarDayToday';
function App() {   
  const handleMaximize = () => {
    window.api.windowControls.maximize();
  };
  const handleMinimize = () => {
    window.api.windowControls.minimize();
  }; 
  const handleClose = () => {
    window.api.windowControls.close();
  };   
  return (
    <>
    <ThemeProvider>
    <TabBar handleClose={handleClose} handleMaximize={handleMaximize} handleMinimize={handleMinimize} imgs={imgs}/> 
    <Router>
      <Routes>
        <Route path='/' element={<DatabaseScreen />} />
        <Route path='/extlogin' element={<ExternalLogScreen />} />
        <Route path='/overview' element={<LogScreen />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboardsend' element={<Sended />} />
        <Route path='/dashboardtrash' element={<Deleted />} />
        <Route path='/file-explorer' element={<FileExplorer />} />
        <Route path='/pinwall' element={<Pinwall />} /> 
        <Route path='/calendar' element={<CalendarDayToday />} />  
        <Route path='/calendar/day/:jahr/:monat/:tag' element={<CalendarDay />} /> 
        <Route path='/calendar/week/:jahr/:monat/:tag' element={<CalendarDay />} /> 
        <Route path='/calendar/month/:jahr/:monat/:tag' element={<CalendarDay />} /> 
        <Route path='/calendar/year/:jahr/:monat/:tag' element={<CalendarDay />} /> 
        <Route path='/calendar/agenda/:jahr/:monat/:tag' element={<CalendarDay />} /> 
        <Route path='/new-message' element={<NewMessage />} /> 
        <Route path='/message/:id' element={<ShowMessage />} /> 
      </Routes>
    </Router> 
    </ThemeProvider>
    </>
  )
}

export default App

