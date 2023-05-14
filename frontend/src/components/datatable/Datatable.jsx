import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { opdColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Datatable = ({kolom, baris, judul = "NO TITLE"}) => {

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={baris}
        columns={kolom}
        pageSize={10}
        // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
