import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import Swal from 'sweetalert2';

const EditIndikator = () => {

    const [namaIndikator, setNamaIndikator] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tahun, setTahun] = useState("");
    const [idIndikator, setIdIndikator] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8081/indikator/update`, {
                nama_indikator: namaIndikator,
                deskripsi: deskripsi,
                tahun: tahun,
                id_indikator: idIndikator
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

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id_indikator = searchParams.get('id');

        axios.get(`http://localhost:8081/indikator?id_indikator=${id_indikator}`)
            .then(response => {
                setNamaIndikator(response.data.data.nama_indikator)
                setDeskripsi(response.data.data.deskripsi)
                setTahun(response.data.data.tahun)
                setIdIndikator(response.data.data.id_indikator)
            })
    }, []);

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                {/* <Navbar /> */}
                <form onSubmit={handleSubmit}>
                    <div className="">

                        <h4>Edit Indikator</h4>
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

                        <button type='submit' className='btn btn-sm btn-primary mt-3'>Simpan Perubahan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditIndikator