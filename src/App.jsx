import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scrolltotop';

// Import Pages
import Beranda from './pages/index';
import Kendaraan from './pages/kendaraan';
import Gadai from './pages/gadai';
import Login from './pages/login'; 

// Import Admin Pages
import Dashboard from './pages/dashboard';
import TambahKendaraan from './pages/Tambahkendaraan';

// Import Satpam
import PrivateRoute from './components/privateroute';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* --- HALAMAN PUBLIK (Bebas Akses) --- */}
        <Route path="/" element={<Beranda />} />
        <Route path="/kendaraan" element={<Kendaraan />} />
        <Route path="/gadai" element={<Gadai />} />
        
        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* --- HALAMAN RAHASIA (Harus Login Dulu) --- */}
        {/* Semua route di dalam sini dijaga oleh PrivateRoute */}
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tambah" element={<TambahKendaraan />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;