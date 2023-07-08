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

const MasterIndicator = () => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const opdColumns = [
    {
      field: "id",
      headerName: "NO",
      width: 20
    },
    {
      field: "nama_indikator",
      headerName: "INDIKATOR",
      width: 200
    },
    {
      field: "deskripsi",
      headerName: "DESKRIPSI",
      flex: 200
    },
    {
      field: "tahun",
      headerName: "TAHUN",
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
              <Link to={`/indikator/edit?id=${params.row.id_indikator}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Edit</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id_indikator)}
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
      axios.get(`http://localhost:8081/indikator`).then(response => {
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

   /**
  * Handle when delete button click
  */
   const handleDelete = (id_indikator) => {
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

        axios.post(`http://localhost:8081/indikator/delete`, {
          id_indikator: id_indikator
        }).then(response => {
          Swal.fire(
            'Deleted!',
            'Indikator Berhasil dihapus',
            'success'
          ).then((result) => {
            if(result.isConfirmed){
              window.location.href = '/indikator';
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
          Master Indikator
          <Link to="/indikator/add-item" className="link">
            Tambah Indikator
          </Link>
        </div>
        <Datatable 
          kolom={opdColumns}
          baris={data}
          judul="Master Indikator"
        />
      </div>
    </div>
  )
}

export default MasterIndicator