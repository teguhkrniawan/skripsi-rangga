import "./list.scss"
import "../../components/datatable/datatable.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom"

const MasterDokumen = () => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const opdColumns = [
    {
      field: "id",
      headerName: "NO",
      width: 20,
    },
    {
      field: "id_dokumen",
      headerName: "NOK",
      width: 20,
      hide: true
    },
    {
      field: "nama_dokumen",
      headerName: "NAMA DOKUMEN",
      width: 200
    },
    {
      field: "nama_indikator",
      headerName: "NAMA INDIKATOR",
      flex: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <div className="cellAction">
              <Link to={`/dokumen/edit?id=${params.row.id_dokumen}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Edit</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id_dokumen)}
              >
                Delete
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      axios.get(`http://localhost:8081/dokumen/`).then(response => {
        // console.log(response.data.data)
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

  /**
* Handle when delete button click
*/
  const handleDelete = (id_dokumen) => {
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

        axios.post(`http://localhost:8081/dokumen/delete`, {
          id_dokumen: id_dokumen
        }).then(response => {

          if (response.status != '200') {
            Swal.fire(
              'Deleted!',
              'Dokumen Tidak Berhasil di Hapus Karena Data Ini Berelasi dengan Laporan Yang Sudah di Input',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/dokumen';
              }
            })
          }

          Swal.fire(
            'Deleted!',
            'Dokumen Berhasil dihapus',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/dokumen';
            }
          })
        }).catch(error => {
          if (error.response && error.response.status === 500) {
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


  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatableTitle">
          Master Dokumen
          <Link to="/dokumen/add-item" className="link">
            Tambah Dokumen
          </Link>
        </div>
        <Datatable
          kolom={opdColumns}
          baris={data}
          judul="Master Dokumen"
        />
      </div>
    </div>
  )
}

export default MasterDokumen