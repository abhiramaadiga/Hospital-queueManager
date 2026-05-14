import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Queue from './pages/Queue';
import History from  './pages/History';
import Analytics from './pages/Analytics';

function App() {
   return (
    <Router>
      <Navbar/>
      <Routes>
         <Route path="/" element={<Register />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/history" element={<History />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
   );
}

export default App;