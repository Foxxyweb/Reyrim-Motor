import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Gadai = () => {
    // STATE 1: Untuk Input Form Kalkulator
    const [formData, setFormData] = useState({
        vehicleType: '',
        brand: '',
        year: 2020,
        marketPrice: 100000000,
        tenor: 12
    });

    // STATE 2: Untuk Hasil Perhitungan
    const [results, setResults] = useState({
        estimatedValue: 0,
        maxLoan: 0,
        monthlyInterest: 0,
        monthlyPayment: 0,
        netAmount: 0
    });

    // STATE 3: Untuk FAQ (Accordion)
    const [activeFaq, setActiveFaq] = useState(0); // Index 0 terbuka default

    // STATE 4: Mobile Menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fungsi Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Fungsi Kalkulasi
    const calculateLoan = () => {
        const marketPrice = parseFloat(formData.marketPrice) || 0;
        const tenor = parseInt(formData.tenor) || 12;

        // Rumus (Sesuai script asli)
        const estimatedValue = marketPrice * 0.85;
        const maxLoan = estimatedValue * 0.80;
        const monthlyInterest = maxLoan * 0.008;
        const monthlyPayment = (maxLoan / tenor) + monthlyInterest;
        const netAmount = maxLoan - 150000;

        setResults({
            estimatedValue,
            maxLoan,
            monthlyInterest,
            monthlyPayment,
            netAmount
        });
    };

    // Jalankan kalkulasi saat pertama kali load (mirip window.onload)
    useEffect(() => {
        calculateLoan();
    }, []); 

    // Handle Perubahan Input Form
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Handle Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
        calculateLoan();
    };

    return (
        <div className="gadai-page-wrapper">
            {/* Screen Reader Live Region */}
            <div id="live-region" className="sr-only" aria-live="polite" aria-atomic="true"></div>

            {/* HEADER & NAVIGASI */}
            <header>
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <h1><i className="fas fa-car" aria-hidden="true"></i> Reyrim Motor</h1>
                            <p>Jual Beli & Gadai Kendaraan</p>
                        </div>
                        
                        <nav aria-label="Navigasi utama">
                            <ul className="nav-links">
                                <li><Link to="/">Beranda</Link></li>
                                <li><Link to="/kendaraan">Kendaraan</Link></li>
                                <li><Link to="/gadai" className="active">Gadai BPKB</Link></li>
                            </ul>
                            
                            <button 
                                className="mobile-menu-btn" 
                                aria-label="Toggle menu" 
                                aria-expanded={isMobileMenuOpen} 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <i className="fas fa-bars" aria-hidden="true"></i>
                            </button>
                        </nav>
                    </div>
                    
                    {isMobileMenuOpen && (
                        <div className="mobile-menu" id="mobile-menu" style={{display: 'block'}}>
                            <ul>
                                <li><Link to="/">Beranda</Link></li>
                                <li><Link to="/kendaraan">Kendaraan</Link></li>
                                <li><Link to="/gadai" className="active">Gadai BPKB</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            {/* BREADCRUMB */}
            <div className="breadcrumb">
                <div className="container">
                    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                        <Link to="/">Beranda</Link>
                        <i className="fas fa-chevron-right"></i>
                        <span>Gadai BPKB</span>
                    </nav>
                </div>
            </div>

            {/* HERO SECTION GADAI */}
            <section className="gadai-hero">
                <div className="container">
                    <div className="gadai-hero-content">
                        <h1>Gadai BPKB Kendaraan</h1>
                        <p>Dapatkan dana tunai cepat dengan jaminan BPKB kendaraan Anda. Proses mudah, aman, dan transparan dengan bunga kompetitif mulai dari 0.8% per bulan.</p>
                        
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <i className="fas fa-clock"></i>
                                <h3>1-2 Jam</h3>
                                <p>Proses Cepat</p>
                            </div>
                            <div className="hero-stat">
                                <i className="fas fa-percentage"></i>
                                <h3>0.8%</h3>
                                <p>Bunga Terendah</p>
                            </div>
                            <div className="hero-stat">
                                <i className="fas fa-shield-alt"></i>
                                <h3>100%</h3>
                                <p>BPKB Aman</p>
                            </div>
                            <div className="hero-stat">
                                <i className="fas fa-users"></i>
                                <h3>2000+</h3>
                                <p>Klien Puas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KEUNTUNGAN SECTION */}
            <section className="gadai-benefits">
                <div className="container">
                    <h2 className="section-title">Mengapa Memilih Kami?</h2>
                    <p className="section-subtitle">Keunggulan layanan gadai BPKB di Reyrim Motor</p>
                    
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h3>Proses Super Cepat</h3>
                            <p>Dana cair dalam 1-2 jam setelah dokumen lengkap. Tidak perlu menunggu berhari-hari.</p>
                        </div>
                        
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-money-bill-wave"></i>
                            </div>
                            <h3>Bunga Kompetitif</h3>
                            <p>Bunga mulai dari 0.8% per bulan, lebih rendah dari lembaga keuangan lainnya.</p>
                        </div>
                        
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-car"></i>
                            </div>
                            <h3>Kendaraan Tetap Dipakai</h3>
                            <p>Anda tetap bisa menggunakan kendaraan selama masa gadai. BPKB saja yang kami simpan.</p>
                        </div>
                        
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-user-shield"></i>
                            </div>
                            <h3>Data Terjamin Aman</h3>
                            <p>Dokumen dan data pribadi Anda dijamin kerahasiaannya dengan sistem keamanan terbaik.</p>
                        </div>
                        
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <h3>Jangka Waktu Fleksibel</h3>
                            <p>Pilih tenor 3, 6, 12, 18, atau 24 bulan sesuai kemampuan finansial Anda.</p>
                        </div>
                        
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-headset"></i>
                            </div>
                            <h3>Layanan 24/7</h3>
                            <p>Konsultasi kapan saja melalui WhatsApp, telepon, atau kunjungi kantor kami.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROSES SECTION */}
            <section className="gadai-process">
                <div className="container">
                    <h2 className="section-title">Proses Mudah 4 Langkah</h2>
                    <p className="section-subtitle">Dari pengajuan hingga pencairan dana hanya dalam hitungan jam</p>
                    
                    <div className="process-timeline">
                        <div className="process-steps">
                            <div className="process-step">
                                <div className="step-number">1</div>
                                <h4>Pengajuan Online/Offline</h4>
                                <p>Isi formulir di website atau datang langsung ke kantor</p>
                            </div>
                            
                            <div className="process-step">
                                <div className="step-number">2</div>
                                <h4>Verifikasi Dokumen</h4>
                                <p>BPKB, STNK, KTP, KK, dan slip gaji</p>
                            </div>
                            
                            <div className="process-step">
                                <div className="step-number">3</div>
                                <h4>Survey Kendaraan</h4>
                                <p>Tim kami datang untuk menilai kondisi kendaraan</p>
                            </div>
                            
                            <div className="process-step">
                                <div className="step-number">4</div>
                                <h4>Pencairan Dana</h4>
                                <p>Dana langsung ditransfer ke rekening Anda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KALKULATOR SECTION */}
            <section className="gadai-calculator-section">
                <div className="container">
                    <h2 className="section-title">Hitung Pinjaman Anda</h2>
                    <p className="section-subtitle">Ketahui berapa dana yang bisa Anda dapatkan</p>
                    
                    <div className="calculator-grid">
                        <div className="calculator-form">
                            <form id="gadaiForm" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="vehicleType">Jenis Kendaraan</label>
                                    <select 
                                        id="vehicleType" 
                                        required 
                                        value={formData.vehicleType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Pilih Jenis Kendaraan</option>
                                        <option value="mobil">Mobil</option>
                                        <option value="motor">Motor</option>
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="brand">Merk Kendaraan</label>
                                    <input 
                                        type="text" 
                                        id="brand" 
                                        placeholder="Contoh: Toyota, Honda, Yamaha" 
                                        required
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="year">Tahun Kendaraan</label>
                                    <input 
                                        type="number" 
                                        id="year" 
                                        min="1990" 
                                        max="2024" 
                                        required
                                        value={formData.year}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="marketPrice">Harga Pasar (Rp)</label>
                                    <input 
                                        type="number" 
                                        id="marketPrice" 
                                        min="10000000" 
                                        required
                                        value={formData.marketPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="tenor">Jangka Waktu</label>
                                    <select 
                                        id="tenor" 
                                        required
                                        value={formData.tenor}
                                        onChange={handleInputChange}
                                    >
                                        <option value="3">3 Bulan</option>
                                        <option value="6">6 Bulan</option>
                                        <option value="12">12 Bulan</option>
                                        <option value="18">18 Bulan</option>
                                        <option value="24">24 Bulan</option>
                                    </select>
                                </div>
                                
                                <button type="submit" className="btn btn-calculate">
                                    <i className="fas fa-calculator"></i> Hitung Pinjaman
                                </button>
                            </form>
                        </div>
                        
                        <div className="calculator-result">
                            <div className="calculation-result">
                                <h3>Estimasi Pinjaman</h3>
                                
                                <div className="result-item">
                                    <span>Nilai Taksiran</span>
                                    <span id="estimatedValue">{formatRupiah(results.estimatedValue)}</span>
                                </div>
                                
                                <div className="result-item">
                                    <span>Plafon Maksimal (80%)</span>
                                    <span id="maxLoan">{formatRupiah(results.maxLoan)}</span>
                                </div>
                                
                                <div className="result-item">
                                    <span>Bunga per Bulan (0.8%)</span>
                                    <span id="monthlyInterest">{formatRupiah(results.monthlyInterest)}</span>
                                </div>
                                
                                <div className="result-item">
                                    <span>Biaya Administrasi</span>
                                    <span>Rp 150.000</span>
                                </div>
                                
                                <div className="result-item total">
                                    <span>Angsuran per Bulan</span>
                                    <span id="monthlyPayment">{formatRupiah(results.monthlyPayment)}</span>
                                </div>
                                
                                <div className="result-item total">
                                    <span>Dana yang Diterima</span>
                                    <span id="netAmount">{formatRupiah(results.netAmount)}</span>
                                </div>
                                
                                <p className="disclaimer">
                                    * Perhitungan di atas hanya estimasi. Nilai sebenarnya akan ditentukan setelah survey kendaraan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DOKUMEN SECTION */}
            <section className="documents-section">
                <div className="container">
                    <h2 className="section-title">Dokumen yang Diperlukan</h2>
                    <p className="section-subtitle">Persiapkan dokumen berikut untuk proses yang lebih cepat</p>
                    
                    <div className="documents-grid">
                        <div className="document-card">
                            <i className="fas fa-id-card"></i>
                            <h3>BPKB Asli</h3>
                            <p>Buku Pemilik Kendaraan Bermotor asli atas nama Anda</p>
                        </div>
                        
                        <div className="document-card">
                            <i className="fas fa-file-alt"></i>
                            <h3>STNK Asli</h3>
                            <p>Surat Tanda Nomor Kendaraan yang masih berlaku</p>
                        </div>
                        
                        <div className="document-card">
                            <i className="fas fa-address-card"></i>
                            <h3>KTP Asli</h3>
                            <p>Kartu Tanda Penduduk pemilik kendaraan</p>
                        </div>
                        
                        <div className="document-card">
                            <i className="fas fa-home"></i>
                            <h3>KK Asli</h3>
                            <p>Kartu Keluarga pemilik kendaraan</p>
                        </div>
                        
                        <div className="document-card">
                            <i className="fas fa-money-check-alt"></i>
                            <h3>Slip Gaji</h3>
                            <p>3 bulan terakhir (bagi karyawan) atau NPWP (wiraswasta)</p>
                        </div>
                        
                        <div className="document-card">
                            <i className="fas fa-receipt"></i>
                            <h3>Faktur Pembelian</h3>
                            <p>Faktur atau kwitansi pembelian kendaraan (jika ada)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="faq-section">
                <div className="container">
                    <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
                    <p className="section-subtitle">Temukan jawaban untuk pertanyaan Anda</p>
                    
                    <div className="faq-content">
                        {/* FAQ Item 1 */}
                        <div className="faq-item">
                            <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
                                <span>Apakah kendaraan saya bisa tetap saya gunakan selama digadaikan?</span>
                                <i className={`fas ${activeFaq === 0 ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </div>
                            <div className={`faq-answer ${activeFaq === 0 ? 'active' : ''}`}>
                                <p>Ya, betul. Anda tetap bisa menggunakan kendaraan sehari-hari seperti biasa. Yang kami simpan hanya BPKB asli saja, sementara STNK dan kendaraan tetap pada Anda.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 2 */}
                        <div className="faq-item">
                            <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                                <span>Berapa lama proses pencairan dananya?</span>
                                <i className={`fas ${activeFaq === 1 ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </div>
                            <div className={`faq-answer ${activeFaq === 1 ? 'active' : ''}`}>
                                <p>Setelah dokumen lengkap dan survey kendaraan selesai, dana bisa cair dalam 1-2 jam kerja. Kami memiliki sistem pencairan yang sangat cepat untuk kebutuhan mendesak Anda.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 3 */}
                        <div className="faq-item">
                            <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
                                <span>Apakah ada biaya tambahan selain bunga?</span>
                                <i className={`fas ${activeFaq === 2 ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </div>
                            <div className={`faq-answer ${activeFaq === 2 ? 'active' : ''}`}>
                                <p>Hanya ada biaya administrasi sekali sebesar Rp 150.000. Tidak ada biaya tersembunyi lainnya. Semua biaya diinformasikan secara transparan sebelum proses dimulai.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 4 */}
                        <div className="faq-item">
                            <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                                <span>Bagaimana jika saya tidak bisa melunasi tepat waktu?</span>
                                <i className={`fas ${activeFaq === 3 ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </div>
                            <div className={`faq-answer ${activeFaq === 3 ? 'active' : ''}`}>
                                <p>Kami memberikan masa tenggang 7 hari kerja setelah jatuh tempo. Jika masih belum bisa melunasi, Anda bisa mengajukan perpanjangan tenor dengan biaya administrasi tambahan.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 5 */}
                        <div className="faq-item">
                            <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}>
                                <span>Kendaraan seperti apa yang bisa digadaikan?</span>
                                <i className={`fas ${activeFaq === 4 ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </div>
                            <div className={`faq-answer ${activeFaq === 4 ? 'active' : ''}`}>
                                <p>Semua jenis kendaraan roda 2 dan roda 4 yang masih berfungsi dengan baik, tahun minimal 1990 ke atas, dan BPKB atas nama sendiri. Kondisi fisik akan dinilai saat survey.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="gadai-cta">
                <div className="container">
                    <h2>Siap Mengajukan Gadai BPKB?</h2>
                    <p>Jangan biarkan kebutuhan finansial menghambat Anda. Dapatkan solusi cepat dengan gadai BPKB kendaraan.</p>
                    
                    <div className="cta-buttons">
                        <a href="https://wa.me/6285296134945?text=Halo%20Reyrim%20Motor,%20saya%20ingin%20konsultasi%20tentang%20gadai%20BPKB" 
                           className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-whatsapp"></i> Konsultasi via WhatsApp
                        </a>
                        
                        <a href="tel:085296134945" className="btn btn-call">
                            <i className="fas fa-phone"></i> Hubungi Kami: 0852-9613-4945
                        </a>
                    </div>
                    
                    <p className="cta-address">
                        <i className="fas fa-map-marker-alt"></i> 
                        Kunjungi Kantor Kami: bukit ayu lestari blok w1 no 31, Mangsang kota Batam
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h3><i className="fas fa-car" aria-hidden="true"></i> Reyrim Motor</h3>
                            <p>Platform jual beli kendaraan dan gadai BPKB terpercaya di Indonesia.</p>
                        </div>
                        
                        <div className="footer-links">
                            <h4>Tautan Cepat</h4>
                            <ul>
                                <li><Link to="/">Beranda</Link></li>
                                <li><Link to="/kendaraan">Kendaraan</Link></li>
                                <li><Link to="/gadai">Gadai BPKB</Link></li>
                                <li><a href="#tentang">Tentang Kami</a></li>
                                <li><a href="#kontak">Kontak</a></li>
                            </ul>
                        </div>
                        
                        <div className="footer-newsletter">
                            <h4>Berlangganan Newsletter</h4>
                            <p>Dapatkan info kendaraan terbaru dan promo menarik.</p>
                            <form id="newsletterForm" aria-label="Form newsletter" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="Email Anda" required aria-required="true" />
                                <button type="submit" className="btn">Berlangganan</button>
                            </form>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <p>&copy; 2024 Reyrim Motor. Semua hak dilindungi.</p>
                    </div>
                </div>
            </footer>

            {/* WHATSAPP FLOAT BUTTON */}
            <a href="https://wa.me/6285296134945?text=Halo%20Reyrim%20Motor.id,%20saya%20ingin%20bertanya%20tentang%20kendaraan" 
               className="whatsapp-float" target="_blank" rel="noopener noreferrer" 
               aria-label="Chat via WhatsApp" title="Chat via WhatsApp">
                <i className="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
        </div>
    );
};

export default Gadai;