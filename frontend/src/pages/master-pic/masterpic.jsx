import "./list.scss"
import "../../components/datatable/datatable.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { Link } from "react-router-dom";

const MasterPic = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const opdColumns = [
        {
            field: "id",
            headerName: "NO",
            width: 20
        },
        {
            field: "nama_pic",
            headerName: "NAMA PIC",
            width: 200
        },
        {
            field: "nip",
            headerName: "NIP",
            width: 200
        },
        {
            field: "no_hp",
            headerName: "No.Hp",
            width: 200
        },
        {
            field: "email",
            headerName: "Email",
            width: 200
        },
        {
            field: "nama_opd",
            headerName: "Nama OPD",
            width: 200
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className="cellAction">
                            <Link to={`/pic/edit?id=${params.row.id_pic}`} style={{ textDecoration: "none" }}>
                                <div className="viewButton">Edit</div>
                            </Link>
                            <div
                                className="deleteButton"
                                onClick={() => handleDelete(params.row.id_pic)}
                            >
                                Delete
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];

    /**
  * Handle when delete button click
  */
    const handleDelete = (id_user) => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Data yang dihapus tidak bisa dikembalikan lagi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Tentu',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`http://localhost:8081/users/delete`, {
                    id_user: id_user
                }).then(response => {
                    Swal.fire(
                        'Deleted!',
                        'PIC Berhasil dihapus',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/pic';
                        }
                    })
                })
                    .catch(error => {
                        if (error.response && error.response.status !== 200) {
                            Swal.fire(
                                'Perhatian!',
                                'Akses di Tolak, Data Terkait Dengan Laporan Yang Telah di Inputkan',
                                'warning'
                            )
                        } else {
                            // Tangani error lainnya
                            console.log('Terjadi kesalahan:', error);
                        }
                    })
            }
        })
    };

    const getData = async () => {
        try {
            axios.get(`http://localhost:8081/users`).then(response => {
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
                <div className="datatableTitle">
                    Master PIC
                    <Link to="/pic/add-item" className="link">
                        Tambah PIC
                    </Link>
                </div>
                <Datatable
                    kolom={opdColumns}
                    baris={data}
                    judul={"Master PIC"}
                />
            </div>
        </div>
    )
}

export default MasterPic