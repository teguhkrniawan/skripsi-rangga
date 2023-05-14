import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import Swal from 'sweetalert2';

const EditOpd = () => {

    const [idOpd, setIdOpd] = useState('')
    const [namaOpd, setNamaOpd] = useState('')
    const [singkatanOpd, setSingkatanOpd] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8081/opd/update`, {
                nama_opd: namaOpd,
                singkatan_opd: singkatanOpd,
                id_opd: idOpd
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

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id_opd = searchParams.get('id');

        axios.get(`http://localhost:8081/opd?id_opd=${id_opd}`)
            .then(response => {
                setNamaOpd(response.data.data.nama_opd)
                setSingkatanOpd(response.data.data.singkatan_opd)
                setIdOpd(response.data.data.id_opd)
            })
    }, []);

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                {/* <Navbar /> */}
                <form onSubmit={handleSubmit}>
                    <div className="">

                        <h4>Edit OPD</h4>
                        <hr />

                        <div className="row">
                            <div className="col-6">

                                <div className="mt-3">
                                    <input
                                        type="hidden"
                                        value={idOpd}
                                    />
                                </div>

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
                                    // onChange={e => setSingkatanOpd(e.target.value)}
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

export default EditOpd