import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import Swal from 'sweetalert2';

const EditPic = () => {

    const [namaPic, setNamaPic] = useState("");
    const [idOpd, setIdOpd] = useState("");
    const [nip, setNIP] = useState("");
    const [noHp, setNoHp] = useState("");
    const [email, setEmail] = useState("");
    const [statusAktif, setStatusAktif] = useState("");
    const [password, setPassword] = useState("");
    const [idPic, setIdPic] = useState("")

    const [opsi, setOption] = useState([]);
    const [selectedOpt, setSelectedOpt] = useState('');

    const handleStatusChange = (e) => {
        setStatusAktif(e.target.value)
    }

    const handleSelectChange = (e) => {
        setSelectedOpt(e.target.value)
        setIdOpd(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8081/users/update`, {
                id_pic: idPic,
                nama_pic: namaPic,
                id_opd: idOpd,
                nip: nip,
                no_hp : noHp,
                email: email,
                status_aktif: statusAktif
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

    useEffect(() => {
        fetchOptions()
            .then(data => setOption(data))
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id_user = searchParams.get('id');

        axios.get(`http://localhost:8081/users?id_user=${id_user}`)
        .then(response => {
            setNamaPic(response.data.data.nama_pic)
            setNIP(response.data.data.nip)
            setNoHp(response.data.data.no_hp)
            setSelectedOpt(response.data.data.id_opd)
            setIdOpd(response.data.data.id_opd)
            setEmail(response.data.data.email)
            setStatusAktif(response.data.data.status_aktif)
            setIdPic(response.data.data.id_pic)
        })
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

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                {/* <Navbar /> */}
                <form onSubmit={handleSubmit}>
                    <div className="">

                        <h4>Edit PIC</h4>
                        <hr />

                        <div className="row">
                            <div className="col-6">

                                <input type="hidden" value={idPic}/>

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
                                                <option value={item.id_opd} key={item.id_opd} selected={item.id_opd == selectedOpt}>{item.singkatan_opd}</option>
                                            ))
                                        }
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
                                    <label htmlFor="" className='mb-2'><b>Status Aktif*</b></label>
                                    <select className='form-select' onChange={handleStatusChange} >
                                        <option value="">--PILIH STATUS--</option>
                                        <option value="1" selected={statusAktif === 1}>AKTIF</option>
                                        <option value="0" selected={statusAktif === 0}>TIDAK AKTIF</option>
                                    </select>
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

export default EditPic