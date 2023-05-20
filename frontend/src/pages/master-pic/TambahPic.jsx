import React, { useEffect, useState } from 'react'
import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Swal from 'sweetalert2'
import axios from 'axios'

const TambahPic = () => {

    const [namaPic, setNamaPic] = useState("");
    const [idOpd, setIdOpd] = useState("");
    const [nip, setNIP] = useState("");
    const [noHp, setNoHp] = useState("");
    const [email, setEmail] = useState("");
    const [statusAktif, setStatusAktif] = useState("");
    const [password, setPassword] = useState("");

    const [opsi, setOption] = useState([]);
    const [selectedOpt, setSelectedOpt] = useState('');

    /**
     * Jalankan use effect
     */
    useEffect(() => {
        fetchOptions()
            .then(data => setOption(data))
            .catch(error => console.log(error))
    }, []);

    /**
     * tampilkan opd untuk option
     */
    const fetchOptions = async () => {
        try {
            const response = await axios.get("http://localhost:8081/opd")
            return response.data.data;
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectChange = (e) => {
        setIdOpd(e.target.value)
        setSelectedOpt(e.target.value)
    }

    const handleStatusChange = (e) => {
        setStatusAktif(e.target.value)
    }

    const handleInsert = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8081/users/add`, {
                "nama_pic" : namaPic,
                "id_opd"   : idOpd,
                "nip"      : nip,
                "no_hp"    : noHp,
                "email"    : email,
                "password" : password,
                "status_aktif" : statusAktif
            });
            if (response) {
                window.location.href = '/pic';
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

                        <h4>Tambah PIC</h4>
                        <hr />

                        <div className="row">
                            <div className="col-6">
                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Nama PIC*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={namaPic}
                                        onChange={e => setNamaPic(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>NIP*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={nip}
                                        onChange={e => setNIP(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>OPD*</b></label>
                                    <select className='form-select' value={selectedOpt} onChange={handleSelectChange}>
                                        <option value="">--PILIH OPD--</option>
                                        {
                                            opsi.map(item => (
                                                <option value={item.id_opd} key={item.id_opd}>{item.singkatan_opd}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Status Aktif*</b></label>
                                    <select className='form-select' onChange={handleStatusChange}>
                                        <option value="">--PILIH STATUS--</option>
                                        <option value="1">AKTIF</option>
                                        <option value="0">TIDAK AKTIF</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Nomor HP*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={noHp}
                                        onChange={e => setNoHp(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Email*</b></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="" className='mb-2'><b>Password*</b></label>
                                    <input
                                        type="passeord"
                                        className='form-control'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
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

export default TambahPic