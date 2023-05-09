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
              <Link to={`/indikator/edit?=${params.row.id_indikator}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Edit</div>
              </Link>
              <div
                className="deleteButton"
                // onClick={() => handleDelete(params.row._id)}
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
        <Datatable 
          kolom={opdColumns}
          baris={data}
        />
      </div>
    </div>
  )
}

export default MasterIndicator