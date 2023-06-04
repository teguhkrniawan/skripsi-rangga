import React, { useEffect, useState } from 'react'
import "./list.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Swal from 'sweetalert2'
import axios from 'axios'
import InfoIcon from "@mui/icons-material/Info";
import { Link } from 'react-router-dom'


const LaporanSpbe = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [jlhDokumen, setJlhDokumen] = useState([]);

    const getData = async () => {
        try {
            axios.get(`http://localhost:8081/laporan/all`).then(response => {
                const data = response.data.data.map((item, index) => ({ ...item, id: index + 1 }))
                setData(data)
                setIsLoading(false)
            })

            axios.get(`http://localhost:8081/dokumen/`).then(response => {
                // console.log(response.data.data)
                const data = response.data.data.map((item, index) => ({ ...item, id: index + 1 }))
                setJlhDokumen(data)
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
                    <h6 className="mt-3 mb-3">Laporan SPBE</h6>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>NAMA OPD</th>
                                <th>UPLOADED</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(item => (
                                    <>
                                        <tr>
                                            <td>{item?.nama_opd}</td>
                                            <td>{item?.jumlah} / {jlhDokumen?.length}</td>
                                            <td style={{ cursor: 'pointer' }}>
                                                <Link to={`/laporan-spbe/detail?id_opd=${item?.id_opd}`}>
                                                    <InfoIcon />
                                                </Link>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default LaporanSpbe