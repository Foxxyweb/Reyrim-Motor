import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Kendaraan = () => {
  // === STATE ===
  const [allVehicles, setAllVehicles] = useState([]);
  const [displayedVehicles, setDisplayedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');
  const [filterKondisi, setFilterKondisi] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  // === 1. AMBIL DATA DARI SUPABASE ===
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('kendaraan')
          .select('*');
        
        if (error) throw error;

        if (data) {
          const formattedData = data.map((item) => ({
            id: item.idkendaraan, 
            nama: item.Namakendaraan, 
            harga: item.Harga,
            tahun: item.tahun,
            gambar: item.gambar === '-' || !item.gambar ? 'https://via.placeholder.com/300x200?text=No+Image' : item.gambar,
            kategori: item.kategori || 'Umum',
            kondisi: item.kondisi || 'Bekas',
            created_at: item.created_at || new Date().toISOString()
          }));
          
          setAllVehicles(formattedData);
          setDisplayedVehicles(formattedData);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // === 2. LOGIKA FILTER ===
  useEffect(() => {
    let result = [...allVehicles];

    // Search
    if (searchTerm) {
      result = result.filter(v => v.nama.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    // Kategori
    if (filterKategori !== 'all') {
      result = result.filter(v => v.kategori.toLowerCase() === filterKategori.toLowerCase());
    }
    // Kondisi
    if (filterKondisi !== 'all') {
      result = result.filter(v => v.kondisi.toLowerCase() === filterKondisi.toLowerCase());
    }

    // Sortir
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.harga - b.harga);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.harga - a.harga);
    } else if (sortBy === 'year-new') {
      result.sort((a, b) => b.tahun - a.tahun);
    } else {
      result.sort((a, b) => b.id - a.id); 
    }

    setDisplayedVehicles(result);
  }, [allVehicles, searchTerm, filterKategori, filterKondisi, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setFilterKategori('all');
    setFilterKondisi('all');
    setSortBy('latest');
  };

  return (
    <div className="react-wrapper">
      {/* === HEADER & NAVIGASI === */}
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1><i className="fas fa-car"></i> Reyrim Motor</h1>
              <p>Jual Beli & Gadai Kendaraan</p>
            </div>
            <nav>
              <ul className="nav-links">
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/kendaraan" className="active">Kendaraan</Link></li>
                <li><Link to="/gadai">Gadai BPKB</Link></li>
              </ul>
              <div className="mobile-menu-btn">
                <i className="fas fa-bars"></i>
              </div>
            </nav>
          </div>
          <div className="mobile-menu">
            <ul>
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/kendaraan">Kendaraan</Link></li>
                <li><Link to="/gadai">Gadai BPKB</Link></li>
            </ul>
          </div>
        </div>
      </header>

      {/* === BREADCRUMB === */}
      <section className="breadcrumb">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Beranda</Link> <i className="fas fa-chevron-right"></i> <span>Daftar Kendaraan</span>
          </nav>
        </div>
      </section>

      {/* === KONTEN UTAMA === */}
      <section className="vehicles-page">
        <div className="container">
          <h1 className="page-title" style={{textAlign:'center', marginBottom:'10px'}}>Daftar Kendaraan Tersedia</h1>
          <p className="page-subtitle" style={{textAlign:'center', marginBottom:'40px', color:'#666'}}>Temukan kendaraan impian Anda dengan berbagai pilihan terbaik</p>
          
          {/* FILTER CARD */}
          <div className="filter-card" style={{
            background: '#fff', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            marginBottom: '30px',
            border: '1px solid #eee'
          }}>
            <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
               <input 
                 type="text" 
                 placeholder="Cari kendaraan (nama, merek, tipe...)" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 style={{flex:1, padding:'10px', border:'1px solid #ddd', borderRadius:'5px'}}
               />
            </div>
            <div style={{display:'flex', gap:'15px', alignItems:'center', flexWrap:'wrap'}}>
               <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                 <label style={{fontSize:'0.9rem', fontWeight:'600'}}>Kategori:</label>
                 <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} style={{padding:'8px', border:'1px solid #ddd', borderRadius:'4px'}}>
                   <option value="all">Semua Kategori</option>
                   <option value="mobil">Mobil</option>
                   <option value="motor">Motor</option>
                 </select>
               </div>
               <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                 <label style={{fontSize:'0.9rem', fontWeight:'600'}}>Kondisi:</label>
                 <select value={filterKondisi} onChange={(e) => setFilterKondisi(e.target.value)} style={{padding:'8px', border:'1px solid #ddd', borderRadius:'4px'}}>
                   <option value="all">Semua Kondisi</option>
                   <option value="baru">Baru</option>
                   <option value="bekas">Bekas</option>
                 </select>
               </div>
               <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                 <label style={{fontSize:'0.9rem', fontWeight:'600'}}>Urutkan:</label>
                 <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{padding:'8px', border:'1px solid #ddd', borderRadius:'4px'}}>
                   <option value="latest">Terbaru</option>
                   <option value="price-low">Harga: Rendah ke Tinggi</option>
                   <option value="price-high">Harga: Tinggi ke Rendah</option>
                   <option value="year-new">Tahun: Terbaru</option>
                 </select>
               </div>
               <button onClick={handleReset} style={{marginLeft:'auto', padding:'8px 15px', background:'transparent', border:'1px solid #e74c3c', color:'#e74c3c', borderRadius:'4px', cursor:'pointer'}}>
                 Reset Filter
               </button>
            </div>
          </div>
          
          {/* GRID KENDARAAN */}
          <div className="vehicles-grid" id="vehiclesGrid">
            {loading ? (
                <div style={{width: '100%', textAlign: 'center', padding: '50px'}}>
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                    <p>Memuat data...</p>
                </div>
            ) : displayedVehicles.length === 0 ? (
                <div className="no-results" style={{width: '100%', textAlign: 'center', padding: '40px', background:'#f9f9f9', borderRadius:'8px'}}>
                    <i className="fas fa-search fa-3x" style={{color:'#ccc', marginBottom:'15px'}}></i>
                    <h3>Tidak ditemukan</h3>
                    <p>Coba reset filter atau gunakan kata kunci lain.</p>
                </div>
            ) : (
                displayedVehicles.map((item) => (
                <div className="vehicle-card" key={item.id} style={{
                    background:'white', borderRadius:'8px', overflow:'hidden', 
                    boxShadow:'0 2px 10px rgba(0,0,0,0.1)', border:'1px solid #eee'
                }}>
                    <div className="vehicle-img" style={{height:'200px', overflow:'hidden', position:'relative'}}>
                        <img src={item.gambar} alt={item.nama} 
                             style={{width:'100%', height:'100%', objectFit:'cover'}}
                             onError={(e) => {e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}} 
                        />
                        <span style={{
                            position:'absolute', top:'10px', left:'10px', 
                            background: item.kondisi === 'Baru' ? '#2ecc71' : '#f39c12',
                            color:'white', padding:'4px 8px', borderRadius:'4px', fontSize:'0.7rem', fontWeight:'bold'
                        }}>
                            {item.kondisi}
                        </span>
                    </div>
                    
                    <div className="vehicle-info" style={{padding:'20px'}}>
                        <div style={{fontSize:'0.75rem', color:'#888', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'5px'}}>
                            {item.kategori}
                        </div>
                        
                        <h3 style={{fontSize:'1.1rem', fontWeight:'bold', margin:'0 0 10px 0', color:'#333'}}>
                            {item.nama}
                        </h3>

                        <p style={{fontSize:'1rem', color:'#e74c3c', fontWeight:'bold', margin:'0 0 5px 0'}}>
                            {formatRupiah(item.harga)}
                        </p>
                        <p style={{fontSize:'0.9rem', color:'#666', marginBottom:'20px'}}>
                            Tahun {item.tahun}
                        </p>
                        
                        {/* HANYA TOMBOL WHATSAPP (FULL WIDTH) */}
                        <a 
                            href={`https://wa.me/6285296134945?text=Halo%20Reyrim%20Motor,%20saya%20tertarik%20dengan%20${encodeURIComponent(item.nama)}%20seharga%20${encodeURIComponent(formatRupiah(item.harga))}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="btn" 
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'center',
                                borderRadius:'4px', 
                                padding:'12px',
                                background: '#25D366',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                fontSize: '0.9rem'
                            }}
                        >
                            <i className="fab fa-whatsapp"></i> Chat Penjual
                        </a>
                    </div>
                </div>
                ))
            )}
          </div>
        </div>
      </section>

      {/* === CALL TO ACTION === */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Tidak Menemukan Kendaraan yang Cocok?</h2>
            <p>Hubungi kami untuk permintaan khusus atau kendaraan yang sedang dicari</p>
            <a href="https://wa.me/6285296134945?text=Halo%20Reyrim%20Motor.id" className="btn btn-large" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp"></i> Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3><i className="fas fa-car"></i> Reyrim Motor</h3>
              <p>Platform jual beli kendaraan dan gadai BPKB terpercaya di Indonesia.</p>
            </div>
            
            <div className="footer-links">
              <h4>Tautan Cepat</h4>
              <ul>
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/kendaraan">Kendaraan</Link></li>
                <li><Link to="/gadai">Gadai BPKB</Link></li>
              </ul>
            </div>
            
            <div className="footer-newsletter">
              <h4>Berlangganan Newsletter</h4>
              <p>Dapatkan info kendaraan terbaru dan promo menarik.</p>
              <form id="newsletterForm" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email Anda" required />
                <button type="submit" className="btn">Berlangganan</button>
              </form>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2023 Reyrim Motor. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* === WHATSAPP FLOAT BUTTON === */}
      <a href="https://wa.me/6285296134945" className="whatsapp-float" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default Kendaraan;