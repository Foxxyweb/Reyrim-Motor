import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const TambahKendaraan = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // --- UPDATE 1: Tambah state 'kondisi' ---
    const [formData, setFormData] = useState({
        nama: '',
        harga: '',
        tahun: '',
        kategori: 'Mobil', 
        kondisi: 'Bekas' 
    });

    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '-';

            // 1. Upload Gambar
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('foto-mobil')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage
                    .from('foto-mobil')
                    .getPublicUrl(filePath);
                
                imageUrl = urlData.publicUrl;
            }

            // 2. Simpan ke Database
            const { error: insertError } = await supabase
                .from('kendaraan')
                .insert([{
                    Namakendaraan: formData.nama,
                    Harga: formData.harga,
                    tahun: formData.tahun,
                    kategori: formData.kategori,
                    kondisi: formData.kondisi, 
                    gambar: imageUrl
                }]);

            if (insertError) throw insertError;

            alert('Sukses! Stok kendaraan berhasil ditambahkan.');
            navigate('/kendaraan'); 

        } catch (error) {
            console.error(error);
            alert('Gagal menyimpan: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{maxWidth:'600px', marginTop:'40px', marginBottom:'60px'}}>
            <h2 style={{textAlign:'center', marginBottom:'20px'}}>Tambah Stok Kendaraan</h2>
            
            <form onSubmit={handleSubmit} style={{background:'white', padding:'30px', borderRadius:'8px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
                
                {/* Nama */}
                <div style={{marginBottom:'15px'}}>
                    <label style={{fontWeight:'bold'}}>Nama Kendaraan</label>
                    <input type="text" name="nama" onChange={handleChange} required placeholder="Contoh: Pajero Sport" style={{width:'100%', padding:'10px', marginTop:'5px', border:'1px solid #ddd', borderRadius:'4px'}} />
                </div>

                {/* Harga & Tahun */}
                <div style={{display:'flex', gap:'15px', marginBottom:'15px'}}>
                    <div style={{flex:1}}>
                        <label style={{fontWeight:'bold'}}>Harga (Rp)</label>
                        <input type="number" name="harga" onChange={handleChange} required placeholder="0" style={{width:'100%', padding:'10px', marginTop:'5px', border:'1px solid #ddd', borderRadius:'4px'}}/>
                    </div>
                    <div style={{flex:1}}>
                        <label style={{fontWeight:'bold'}}>Tahun</label>
                        <input type="number" name="tahun" onChange={handleChange} required placeholder="2024" style={{width:'100%', padding:'10px', marginTop:'5px', border:'1px solid #ddd', borderRadius:'4px'}}/>
                    </div>
                </div>

                <div style={{display:'flex', gap:'15px', marginBottom:'15px'}}>
                    <div style={{flex:1}}>
                        <label style={{fontWeight:'bold'}}>Kategori</label>
                        <select name="kategori" onChange={handleChange} style={{width:'100%', padding:'10px', marginTop:'5px', border:'1px solid #ddd', borderRadius:'4px'}}>
                            <option value="Mobil">Mobil</option>
                            <option value="Motor">Motor</option>
                        </select>
                    </div>
                    <div style={{flex:1}}>
                        <label style={{fontWeight:'bold'}}>Kondisi</label>
                        <select name="kondisi" onChange={handleChange} style={{width:'100%', padding:'10px', marginTop:'5px', border:'1px solid #ddd', borderRadius:'4px'}}>
                            <option value="Bekas">Bekas</option>
                            <option value="Baru">Baru</option>
                        </select>
                    </div>
                </div>

                {/* Upload Foto */}
                <div style={{marginBottom:'25px'}}>
                    <label style={{fontWeight:'bold'}}>Foto Kendaraan</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} required style={{width:'100%', padding:'10px', marginTop:'5px', border:'1px solid #ddd', background:'#f9f9f9'}}/>
                </div>

                <button type="submit" disabled={loading} className="btn" style={{width:'100%', padding:'15px', background:'#e74c3c', color:'white', fontWeight:'bold', border:'none', borderRadius:'4px', cursor:'pointer'}}>
                    {loading ? 'Sedang Menyimpan...' : 'Simpan Data'}
                </button>
            </form>
        </div>
    );
};

export default TambahKendaraan;