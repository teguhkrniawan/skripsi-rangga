import React, { useState } from 'react'
import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Swal from 'sweetalert2'
import axios from 'axios'

const TambahOpd = () => {

    const [namaOpd, setNamaOpd] = useState("");
    const [singkatanOpd, setSingkatanOpd] = useState("");

    const handleInsert = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8081/opd/add`, {
                nama_opd: namaOpd,
                singkatan_opd: singkatanOpd
            });
            if (response) {
                window.location.href = '/opd';
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

                        <h4>Tambah OPD</h4>
                        <hr />

                        <div className="row">
                            <div className="col-6">
                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Nama OPD*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={namaOpd}
                                        onChange={e => setNamaOpd(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Singkatan OPD*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={singkatanOpd}
                                        onChange={e => setSingkatanOpd(e.target.value)}
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

export default TambahOpd