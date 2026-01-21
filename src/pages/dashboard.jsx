import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Dashboard = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Format angka ke Rupiah
    const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

    // 1. Ambil Data saat halaman dibuka
    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            // PERBAIKAN DISINI:
            // Mengurutkan berdasarkan 'idkendaraan' (bukan created_at)
            // ascending: false artinya ID paling besar (data baru) akan muncul paling atas
            const { data, error } = await supabase
                .from('kendaraan')
                .select('*')
                .order('idkendaraan', { ascending: false }); 
            
            if (error) throw error;
            setVehicles(data);
        } catch (error) {
            console.error("Error:", error.message);
            alert("Gagal mengambil data: " + error.message); // Tambah alert biar tau kalau ada error
        } finally {
            setLoading(false);
        }
    };

    // 2. Fungsi Hapus Data (Hapus Foto di Storage + Hapus Data di Tabel)
    const handleDelete = async (id, imageUrl) => {
        // Konfirmasi keamanan
        if (window.confirm("YAKIN MAU HAPUS? Data ini akan hilang permanen.")) {
            try {
                // A. Hapus Gambarnya dulu dari Storage (Supaya bucket tidak penuh sampah)
                if (imageUrl && imageUrl.includes('supa')) {
                    // Ambil nama file dari URL
                    const fileName = imageUrl.split('/').pop();
                    
                    const { error: storageError } = await supabase.storage
                        .from('foto-mobil')
                        .remove([fileName]);
                        
                    if (storageError) console.warn("Gagal hapus gambar (abaikan):", storageError);
                }

                // B. Hapus Data dari Tabel Database
                const { error } = await supabase
                    .from('kendaraan')
                    .delete()
                    .eq('idkendaraan', id); // PENTING: Pakai idkendaraan

                if (error) throw error;

                // C. Update tampilan tabel tanpa refresh halaman (Hapus item dari layar)
                setVehicles(vehicles.filter((item) => item.idkendaraan !== id));
                alert("Data berhasil dihapus!");

            } catch (error) {
                alert("Gagal menghapus: " + error.message);
            }
        }
    };

    return (
        <div className="container" style={{marginTop:'40px', marginBottom:'80px', maxWidth:'1200px'}}>
            
            {/* Header Dashboard */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px', flexWrap:'wrap', gap:'10px'}}>
                <div>
                    <h2 style={{margin:0}}>Dashboard Admin</h2>
                    <p style={{color:'#666', margin:0}}>Kelola stok mobil & motor kamu di sini.</p>
                </div>
                <Link to="/tambah" className="btn" style={{background:'#2ecc71', color:'white', padding:'12px 25px', textDecoration:'none', borderRadius:'6px', fontWeight:'bold', boxShadow:'0 4px 6px rgba(46, 204, 113, 0.3)'}}>
                    + Tambah Stok Baru
                </Link>
            </div>

            {/* Tabel Data */}
            <div style={{background:'white', padding:'20px', borderRadius:'10px', boxShadow:'0 5px 15px rgba(0,0,0,0.05)', overflowX:'auto'}}>
                <table style={{width:'100%', borderCollapse:'collapse', minWidth:'800px'}}>
                    <thead>
                        <tr style={{background:'#f8f9fa', textAlign:'left', color:'#555'}}>
                            <th style={{padding:'15px', borderBottom:'2px solid #eee'}}>Foto</th>
                            <th style={{padding:'15px', borderBottom:'2px solid #eee'}}>Nama Kendaraan</th>
                            <th style={{padding:'15px', borderBottom:'2px solid #eee'}}>Harga</th>
                            <th style={{padding:'15px', borderBottom:'2px solid #eee'}}>Kategori</th>
                            <th style={{padding:'15px', borderBottom:'2px solid #eee'}}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{textAlign:'center', padding:'30px'}}>Sedang memuat data...</td></tr>
                        ) : vehicles.length === 0 ? (
                            <tr><td colSpan="5" style={{textAlign:'center', padding:'30px', color:'#888'}}>Belum ada stok barang. Yuk tambah dulu!</td></tr>
                        ) : (
                            vehicles.map((item) => (
                                <tr key={item.idkendaraan} style={{borderBottom:'1px solid #eee'}}>
                                    <td style={{padding:'10px'}}>
                                        <img 
                                            src={item.gambar === '-' ? 'https://via.placeholder.com/100x60' : item.gambar} 
                                            alt="thumb" 
                                            style={{width:'80px', height:'50px', objectFit:'cover', borderRadius:'6px', border:'1px solid #ddd'}} 
                                        />
                                    </td>
                                    <td style={{padding:'15px'}}>
                                        <div style={{fontWeight:'bold', fontSize:'1rem'}}>{item.Namakendaraan}</div>
                                        <div style={{fontSize:'0.85rem', color:'#888'}}>
                                            Thn {item.tahun} • <span style={{color: item.kondisi === 'Baru' ? '#2ecc71' : '#f39c12'}}>{item.kondisi}</span>
                                        </div>
                                    </td>
                                    <td style={{padding:'15px', fontWeight:'bold', color:'#333'}}>
                                        {formatRupiah(item.Harga)}
                                    </td>
                                    <td style={{padding:'15px'}}>
                                        <span style={{
                                            background: item.kategori === 'Mobil' ? '#e3f2fd' : '#fff3e0', 
                                            color: item.kategori === 'Mobil' ? '#1565c0' : '#ef6c00', 
                                            padding:'5px 10px', borderRadius:'20px', fontSize:'0.85rem', fontWeight:'bold'
                                        }}>
                                            {item.kategori}
                                        </span>
                                    </td>
                                    <td style={{padding:'15px'}}>
                                        <div style={{display:'flex', gap:'8px'}}>
                                            
                                            {/* Tombol Hapus (Sampah) */}
                                            <button 
                                                onClick={() => handleDelete(item.idkendaraan, item.gambar)}
                                                title="Hapus Stok"
                                                style={{background:'#e74c3c', color:'white', width:'35px', height:'35px', border:'none', borderRadius:'6px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;