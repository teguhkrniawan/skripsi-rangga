import React, { useState } from 'react'
import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Swal from 'sweetalert2'
import axios from 'axios'

const TambahIndikator = () => {

    const [namaIndikator, setNamaIndikator] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tahun, setTahun] = useState("");

    const handleInsert = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8081/indikator/add`, {
                nama_indikator: namaIndikator,
                deskripsi: deskripsi,
                tahun: tahun
            });
            if (response) {
                window.location.href = '/indikator';
            }
        } catch (error) {
            Swal.fire(
                'Pesan Kesalahan',
                error.response.data.message,
                'error'
            )
        }
    }

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                {/* <Navbar /> */}
                <form onSubmit={handleInsert}>
                    <div className="">

                        <h4>Tambah Indikator</h4>
                        <hr />

                        <div className="row">
                            <div className="col-6">
                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Nama Indikator*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={namaIndikator}
                                        onChange={e => setNamaIndikator(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Deskripsi*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={deskripsi}
                                        onChange={e => setDeskripsi(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Tahun*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={tahun}
                                        onChange={e => setTahun(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='btn btn-sm btn-primary mt-3'>Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TambahIndikator