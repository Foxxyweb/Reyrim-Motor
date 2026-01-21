import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

const Beranda = () => {
 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;

   
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

   
    const [recommendations, setRecommendations] = useState([]);
    const [loadingRec, setLoadingRec] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoadingRec(true);
            try {
               
                const { data, error } = await supabase
                    .from('kendaraan')
                    .select('*'); 
                
                if (error) throw error;
                
                if (data) {
                  
                    const sortedData = data.sort((a, b) => b.id - a.id);
                    
                   
                    const top4 = sortedData.slice(0, 4);

                    const formattedData = top4.map(item => ({
                        id: item.id,
                        nama: item.Namakendaraan, 
                        harga: item.Harga,
                        tahun: item.tahun,
                        
                        gambar: item.gambar === '-' || !item.gambar 
                                ? 'https://via.placeholder.com/300x200?text=No+Image' 
                                : item.gambar,
                        kategori: item.kategori || 'Umum'
                    }));
                    setRecommendations(formattedData);
                }
            } catch (error) {
                console.error("Gagal ambil rekomendasi:", error.message);
            } finally {
                setLoadingRec(false);
            }
        };
        fetchRecommendations();
    }, []);

    
    const [calcForm, setCalcForm] = useState({ price: 100000000, tenor: 12 });
    const [calcResult, setCalcResult] = useState({
        estimated: 0,
        maxLoan: 0,
        interest: 0,
        installment: 0
    });

    const handleCalculate = (e) => {
        e.preventDefault();
        const price = parseFloat(calcForm.price);
        const tenor = parseInt(calcForm.tenor);

        const estimated = price * 0.85; 
        const maxLoan = estimated * 0.80; 
        const interest = maxLoan * 0.01; 
        const installment = (maxLoan / tenor) + interest;

        setCalcResult({ estimated, maxLoan, interest, installment });
    };

    const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

    return (
        <div className="homepage-wrapper">
            {/* === HEADER & NAVIGASI === */}
            <header>
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <h1><i className="fas fa-car" aria-hidden="true"></i> Reyrim Motor.id</h1>
                            <p>Jual Beli & Gadai Kendaraan</p>
                        </div>
                        
                        <nav aria-label="Navigasi utama">
                            <ul className="nav-links">
                                <li><Link to="/" className="active">Beranda</Link></li>
                                <li><Link to="/kendaraan">Kendaraan</Link></li>
                                <li><Link to="/gadai">Gadai BPKB</Link></li>
                            </ul>
                            
                            <button 
                                className="mobile-menu-btn" 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                        </nav>
                    </div>
                    
                    {isMobileMenuOpen && (
                        <div className="mobile-menu" style={{ display: 'block' }}>
                            <ul>
                                <li><Link to="/" className="active">Beranda</Link></li>
                                <li><Link to="/kendaraan">Kendaraan</Link></li>
                                <li><Link to="/gadai">Gadai BPKB</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            {/* === HERO SECTION === */}
            <section className="hero" id="home">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h2>Jual Beli & Gadai BPKB Kendaraan</h2>
                            <p>Temukan kendaraan impian Anda dengan harga terbaik. Juga nikmati layanan gadai BPKB dengan proses cepat dan aman.</p>
                            <div className="hero-buttons">
                                <Link to="/kendaraan" className="btn">Lihat Kendaraan</Link>
                                <Link to="/gadai" className="btn btn-outline">Cek Gadai BPKB</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === PROMO SLIDER === */}
            <section className="promo-section" aria-label="Promo dan penawaran">
                <div className="simple-promo-banner">
                    <div className="promo-slides">
                        <div className={`promo-slide ${currentSlide === 0 ? 'active' : ''}`}>
                            <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Promo Cashback" />
                            <div className="promo-overlay">
                                <div className="promo-text">
                                    <span className="promo-badge promo-badge-1">🔥 PROMO TERBATAS</span>
                                    <h3>Cashback Hingga Rp 10 Juta!</h3>
                                    <p>Khusus pembelian mobil baru Januari - Maret 2024</p>
                                </div>
                            </div>
                        </div>
                        <div className={`promo-slide ${currentSlide === 1 ? 'active' : ''}`}>
                            <img src="https://images.unsplash.com/photo-1568302977881-5c7bdee4d1c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Promo Gadai" />
                            <div className="promo-overlay">
                                <div className="promo-text">
                                    <span className="promo-badge promo-badge-2">💎 BUNGA SPESIAL</span>
                                    <h3>Gadai BPKB Bunga 0.8%</h3>
                                    <p>Khusus kendaraan 2020 ke atas. Proses cepat & aman</p>
                                </div>
                            </div>
                        </div>
                        <div className={`promo-slide ${currentSlide === 2 ? 'active' : ''}`}>
                            <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Promo Motor" />
                            <div className="promo-overlay">
                                <div className="promo-text">
                                    <span className="promo-badge promo-badge-3">🏍️ PAKET LENGKAP</span>
                                    <h3>Beli Motor Gratis Asuransi</h3>
                                    <p>+ Helm Premium + Jaket Riding untuk semua merk</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="promo-nav">
                        {[0, 1, 2].map((index) => (
                            <button 
                                key={index}
                                className={`nav-dot ${currentSlide === index ? 'active' : ''}`} 
                                onClick={() => setCurrentSlide(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </section>

            {/* === REKOMENDASI KENDARAAN (LIVE DATA) === */}
            <section className="preview-vehicles" id="preview-vehicles">
                <div className="container">
                    <h2 className="section-title">Rekomendasi Kendaraan</h2>
                    <p className="section-subtitle">Lihat stok terbaru kami hari ini</p>
                    
                    <div className="preview-grid">
                        {loadingRec ? (
                             <p style={{textAlign:'center', width:'100%'}}>Sedang mengambil data...</p>
                        ) : recommendations.length === 0 ? (
                             <p style={{textAlign:'center', width:'100%'}}>Belum ada data kendaraan.</p>
                        ) : (
                            recommendations.map((item) => (
                                <article className="preview-card" key={item.id}>
                                    <div className="preview-image">
                                        <img src={item.gambar} alt={item.nama} onError={(e) => {e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}} />
                                    </div>
                                    <div className="preview-info">
                                        <span style={{fontSize:'0.7rem', color:'#888', textTransform:'uppercase'}}>{item.kategori}</span>
                                        <h3>{item.nama}</h3>
                                        <p className="preview-price">{formatRupiah(item.harga)}</p>
                                        <Link to="/kendaraan" className="btn btn-small">Lihat Detail</Link>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                    
                    <div style={{textAlign: 'center', marginTop: '30px'}}>
                         <Link to="/kendaraan" className="btn btn-outline">Lihat Semua Kendaraan</Link>
                    </div>
                </div>
            </section>

            {/* === GADAI BPKB SECTION === */}
            <section className="gadai-section" id="gadai">
                <div className="container">
                    <h2 className="section-title">Gadai BPKB Kendaraan</h2>
                    <p className="section-subtitle">Dapatkan dana cepat dengan gadai BPKB kendaraan Anda</p>
                    
                    <div className="gadai-container">
                        <div className="gadai-info">
                            <h3>Keuntungan Gadai BPKB di Reyrim Motor</h3>
                            <ul className="benefits-list">
                                <li><i className="fas fa-check-circle"></i> Proses cepat hanya 1-2 jam</li>
                                <li><i className="fas fa-check-circle"></i> Bunga kompetitif mulai dari 1% per bulan</li>
                                <li><i className="fas fa-check-circle"></i> Jangka waktu fleksibel 3-24 bulan</li>
                                <li><i className="fas fa-check-circle"></i> BPKB aman disimpan di kami</li>
                                <li><i className="fas fa-check-circle"></i> Kendaraan tetap bisa digunakan</li>
                                <li><i className="fas fa-check-circle"></i> Tidak ada biaya tambahan tersembunyi</li>
                            </ul>
                            
                            <div className="gadai-steps">
                                <h3>Cara Mengajukan Gadai BPKB</h3>
                                <div className="steps-container">
                                    <div className="step">
                                        <div className="step-number">1</div>
                                        <h4>Ajukan</h4>
                                        <p>Isi formulir</p>
                                    </div>
                                    <div className="step">
                                        <div className="step-number">2</div>
                                        <h4>Verifikasi</h4>
                                        <p>Cek dokumen</p>
                                    </div>
                                    <div className="step">
                                        <div className="step-number">3</div>
                                        <h4>Survey</h4>
                                        <p>Cek fisik</p>
                                    </div>
                                    <div className="step">
                                        <div className="step-number">4</div>
                                        <h4>Cair</h4>
                                        <p>Terima dana</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* KALKULATOR GADAI */}
                        <div className="gadai-calculator">
                            <h3>Kalkulator Gadai</h3>
                            <p>Perkirakan dana yang bisa didapat</p>
                            
                            <form onSubmit={handleCalculate}>
                                <div className="form-group">
                                    <label htmlFor="vehicle-value">Perkiraan Harga (Rp)</label>
                                    <input 
                                        type="number" 
                                        id="vehicle-value" 
                                        min="1000000" 
                                        value={calcForm.price}
                                        onChange={(e) => setCalcForm({...calcForm, price: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="loan-period">Tenor (Bulan)</label>
                                    <select 
                                        id="loan-period" 
                                        value={calcForm.tenor}
                                        onChange={(e) => setCalcForm({...calcForm, tenor: e.target.value})}
                                        required
                                    >
                                        <option value="3">3 Bulan</option>
                                        <option value="6">6 Bulan</option>
                                        <option value="12">12 Bulan</option>
                                        <option value="18">18 Bulan</option>
                                        <option value="24">24 Bulan</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-calculate">Hitung Estimasi</button>
                            </form>
                            
                            <div className="calculation-result">
                                <div className="result-item">
                                    <span>Plafond Pinjaman (80%)</span>
                                    <span>{formatRupiah(calcResult.maxLoan)}</span>
                                </div>
                                <div className="result-item total">
                                    <span>Angsuran/Bulan</span>
                                    <span>{formatRupiah(calcResult.installment)}</span>
                                </div>
                                <p className="disclaimer">*Estimasi awal, nilai real ditentukan setelah survey.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === TENTANG KAMI === */}
            <section className="about-section" id="tentang">
                <div className="container">
                    <h2 className="section-title">Tentang Kami</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <h3>Reyrim Motor - Solusi Terpercaya</h3>
                            <p>Kami adalah platform jual beli kendaraan bermotor dan layanan gadai BPKB terpercaya di Indonesia. Membantu ribuan pelanggan mendapatkan kendaraan impian dan solusi keuangan cepat.</p>
                            <div className="stats">
                                <div className="stat"><h4>5000+</h4><p>Terjual</p></div>
                                <div className="stat"><h4>2000+</h4><p>Nasabah Gadai</p></div>
                                <div className="stat"><h4>10+</h4><p>Tahun Pengalaman</p></div>
                            </div>
                        </div>
                        <div className="about-image">
                            <img src="https://i.ibb.co.com/jv9sQL31/dwada.jpg" alt="Tim Reyrim Motor.id" />
                        </div>
                    </div>
                </div>
            </section>

            {/* === KONTAK & PETA === */}
            <section className="contact-section" id="kontak">
                <div className="container">
                    <h2 className="section-title">Lokasi Kami</h2>
                    <div className="contact-content">
                        <div className="contact-info">
                            <h3>Kantor Pusat</h3>
                            <div className="contact-item"><i className="fas fa-map-marker-alt"></i><div><p>Bukit Ayu Lestari Blok W1 No 31, Mangsang, Kota Batam</p></div></div>
                            <div className="contact-item"><i className="fas fa-phone"></i><div><p>0852-9613-4945</p></div></div>
                            <div className="contact-item"><i className="fas fa-envelope"></i><div><p>raimondosibarani@gmail.com</p></div></div>
                            <div className="contact-item"><i className="fas fa-clock"></i><div><p>Senin - Sabtu: 08:00 - 17:00</p></div></div>
                        </div>
                        <div className="contact-map">
                            <iframe 
                                title="Lokasi Reyrim Motor"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.057864823438!2d104.0487013!3d1.0408543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98921856ddfab%3A0xf9f9a7465b6a7a0!2sBukit%20Ayu%20Lestari!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                                width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                            </iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* === FOOTER === */}
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h3><i className="fas fa-car"></i> Reyrim Motor</h3>
                            <p>Platform jual beli & gadai terpercaya.</p>
                        </div>
                        <div className="footer-links">
                            <h4>Menu</h4>
                            <ul>
                                <li><a href="#home">Beranda</a></li>
                                <li><Link to="/kendaraan">Kendaraan</Link></li>
                                <li><Link to="/gadai">Gadai BPKB</Link></li>
                                <li><a href="#kontak">Kontak</a></li>
                            </ul>
                        </div>
                        <div className="footer-newsletter">
                            <h4>Newsletter</h4>
                            <p>Dapatkan info promo terbaru.</p>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="Email" required />
                                <button type="submit" className="btn">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 Reyrim Motor. Semua hak dilindungi.</p>
                    </div>
                </div>
            </footer>

            {/* === WA BUTTON === */}
            <a href="https://wa.me/6285296134945?text=Halo%20Reyrim%20Motor.id" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
            </a>
        </div>
    );
};

export default Beranda;