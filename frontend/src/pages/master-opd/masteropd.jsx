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

const MasterOpd = () => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
    /**
    * Handle when delete button click
    */
    const handleDelete = (id_opd) => {
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
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    };

  const opdColumns = [
    {
      field: "id",
      headerName: "NO",
      width: 20
    },
    {
      field: "singkatan_opd",
      headerName: "SINGKATAN OPD",
      width: 200
    },
    {
      field: "nama_opd",
      headerName: "NAMA OPD",
      flex: 1
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <div className="cellAction">
              <Link to={`/opd/edit?id=${params.row.id_opd}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Edit</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id_opd)}
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
      axios.get(`http://localhost:8081/opd`).then(response => {
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
          Master Opd
          <Link to="/opd/add-item" className="link">
            Tambah OPD
          </Link>
        </div>
        <Datatable
          kolom={opdColumns}
          baris={data}
          judul={"Master OPD"}
        />
      </div>
    </div>
  )
}

export default MasterOpd