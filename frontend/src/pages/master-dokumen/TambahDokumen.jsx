import React, { useEffect, useState } from 'react'
import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Swal from 'sweetalert2'
import axios from 'axios'

const TambahDokumen = () => {

    const [namaDokumen, setNamaDokumen] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [idIndikator, setIdIndikator] = useState("");
    const [indikatorList, setIndikatorList] = useState([]);

    const handleInsert = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8081/dokumen/add`, {
                nama_dokumen: namaDokumen,
                deskripsi: deskripsi,
                id_indikator: idIndikator
                
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

    /**
   * Jalankan use effect
   */
    useEffect(() => {
        fetchOptions()
            .then(data => setIndikatorList(data))
            .catch(error => console.log(error))
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
                {/* <Navbar /> */}
                <form onSubmit={handleInsert}>
                    <div className="">

                        <h4>Tambah Dokumen</h4>
                        <hr />

                        <div className="row">
                            <div className="col-6">
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
                                            indikatorList.map( item => (
                                                <option value={item.id_indikator} key={item.id_indikator}>{item.nama_indikator}</option>
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

export default TambahDokumen