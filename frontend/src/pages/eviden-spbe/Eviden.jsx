import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Eviden = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [dataModalAdd, setDataModalAdd] = useState(null);
    const [dataModalUpdate, setDataModalUpdate] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const checkIsUploaded = async (idPic, idDok) => {
            try {
                const response = await axios.get(`http://localhost:8081/dokumen/myDokumen?idPic=${idPic}&idDok=${idDok}`);
                const status = response.data.data.jlh;
                if (status === 1) {
                    return '1';
                }
                return '0';
            } catch (error) {
                Swal.fire('Pesan Kesalahan', error.response.data.message, 'error');
                throw error;
            }
        };

        const getAllDokumen = async () => {
            try {
                // Mendapatkan nilai dari localStorage
                const userString = localStorage.getItem('user');

                if (userString) {
                    // Mengubah string JSON menjadi objek JavaScript
                    const userObj = JSON.parse(userString);

                    // Mendapatkan nilai properti id_pic dari objek user
                    const { id_pic } = userObj;

                    // Mengupdate state userId dengan nilai id_pic
                    setUserId(id_pic);
                }

                const response = await axios.get('http://localhost:8081/dokumen/');
                const data = response.data.data.map((item, index) => ({ ...item, id: index + 1 }));

                const checkIsUploadedResults = await Promise.all(
                    data.map((item) => checkIsUploaded(userId, item.id_dokumen))
                );

                const updatedData = data.map((item, index) => ({ ...item, isUploaded: checkIsUploadedResults[index] }));

                setData(updatedData);
                setIsLoading(false);
            } catch (error) {
                Swal.fire('Pesan Kesalahan', error.response.data.message, 'error');
            }
        };

        if (isLoading) {
            getAllDokumen();
        }
    }, [isLoading, userId]);


    const showAddModal = (item) => {
        setDataModalAdd(item)
    }

    const showUpdateModal = (item) => {
        setDataModalUpdate(item)
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const insertLaporan = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('http://localhost:8081/dokumen/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            const filename = response.data.filename;

            const response2 = await axios.post("http://localhost:8081/laporan/add", {
                "id_dokumen": dataModalAdd.id_dokumen,
                "nama_file_dokumen": filename,
                "tanggal_upload": "2023-06-03",
                "id_pic": userId
            })
            if (response2) {
                window.location.href = '/eviden-spbe';
            }

        } catch (error) {
            Swal.fire('Pesan Kesalahan', error.response.data.message, 'error');
        }
    }

    return (
        <>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <div className="container mt-3">
                        <h5>Pengajuan Eviden</h5>

                        <table className="table">
                            <thead>
                                <tr>
                                    <td>No</td>
                                    <td>Nama Dokumen</td>
                                    <td>Status</td>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>#</td>
                                        <td
                                            style={{ cursor: 'pointer' }}
                                            data-bs-toggle="modal" data-bs-target={item.isUploaded == '0' ? '#modalAdd' : '#modalUpdate'}
                                            onClick={() => { item.isUploaded == '0' ? showAddModal(item) : showUpdateModal(item) }}
                                        >{item.nama_dokumen}</td>
                                        <td>{item.isUploaded >= '1' ? <Check /> : <Close />}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* modal upload when status silang */}
            <div id='modalAdd' className="modal fade" tabIndex="-1" aria-label='modalAddLabel' aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Upload {dataModalAdd?.nama_dokumen}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="" className='mb-2'>Pilih Dokumen Anda</label>
                            <input type="file" className='form-control' onChange={handleFileChange} />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Tutup
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={insertLaporan}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal update when status silang */}
            <div id='modalUpdate' className="modal fade" tabIndex="-1" aria-label='modalUpdateLabel' aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Informasi Eviden</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Anda sudah mengupload eviden untuk dokumen ini</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Eviden;
