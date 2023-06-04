import React, { useEffect, useState } from 'react'
import "./list.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment';


const DetailLaporanSpbe = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {

        const searchParams = new URLSearchParams(window.location.search);
        const id_opd = searchParams.get('id_opd');

        try {
            axios.get(`http://localhost:8081/laporan/byopd?id_opd=${id_opd}`).then(response => {
                const data = response.data.data.map((item, index) => ({ ...item, id: index + 1 }))
                setData(data)
                setIsLoading(false)
            })

        } catch (error) {
            Swal.fire(
                'Pesan Kesalahan',
                error.response.data.message,
                'error'
            )
        }
    }

    useEffect(() => {
        if (isLoading) {
            getData()
        }
    }, [isLoading])

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="container">
                    <h6 className="mt-3 mb-3">Daftar Dokumen Yang di Upload</h6>

                    <table className="table">
                        <thead>
                            <tr>
                                <td>Nama Dokumen</td>
                                <td>Waktu Upload</td>
                                <td>File</td>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map(item => (<>
                                <tr>
                                    <td>{ item?.nama_dokumen }</td>
                                    <td>{ moment(item?.tanggal_upload).format("YYYY-MM-DD") }</td>
                                    <td>
                                        <a href={`http://localhost:8081/assets/${item?.nama_file_dokumen}`}>Detail</a>
                                    </td>
                                </tr>
                            </>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DetailLaporanSpbe