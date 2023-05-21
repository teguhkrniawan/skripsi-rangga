import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import Swal from 'sweetalert2';

const EditDokumen = () => {

    const [namaDokumen, setNamaDokumen] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [idIndikator, setIdIndikator] = useState("");
    const [idDokumen, setIdDokumen] = useState("");
    const [indikatorList, setIndikatorList] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8081/dokumen/update`, {
                nama_dokumen: namaDokumen,
                deskripsi: deskripsi,
                id_indikator: idIndikator,
                id_dokumen : idDokumen
            });
            if (response) {
                window.location.href = '/dokumen';
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
        fetchOptions()
            .then(data => setIndikatorList(data))
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id_dokumen = searchParams.get('id');

        axios.get(`http://localhost:8081/dokumen?id=${id_dokumen}`)
            .then(response => {
                setIdDokumen(id_dokumen)
                setNamaDokumen(response.data.data.nama_dokumen)
                setDeskripsi(response.data.data.deskripsi)
                setIdIndikator(response.data.data.id_indikator)
            })
    }, []);

    /**
     * tampilkan opd untuk option
     */
    const fetchOptions = async () => {
        try {
            const response = await axios.get("http://localhost:8081/indikator")
            return response.data.data;
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        setIdIndikator(e.target.value)
    }

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <form onSubmit={handleSubmit}>
                    <div className="">

                        <h4>Edit Dokumen</h4>
                        <hr />

                        <div className="row">
                            <div className="col-6">

                                <input type="hidden" value={idDokumen} />

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Nama Dokumen*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={namaDokumen}
                                        onChange={e => setNamaDokumen(e.target.value)}
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
                                    <label htmlFor="" className='mb-2'><b>Pilih Indikator</b></label>
                                    <select className='form-select' value={idIndikator} onChange={handleSelectChange}>
                                        <option>--PILIH INDIKATOR--</option>
                                        {
                                            indikatorList.map(item => (
                                                <option value={item.id_indikator} key={item.id_indikator} selected={item.id_indikator == idIndikator} >{item.nama_indikator}</option>
                                            ))
                                        }
                                    </select>
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

export default EditDokumen